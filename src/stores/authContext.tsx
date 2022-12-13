import React, { createContext, useCallback, useEffect, useState } from "react"
import {JwtPayload, verify} from "jsonwebtoken"
import getDisplayInfo from "../../helpers/getDisplayInfo";

let expireTimeout: ReturnType<typeof setTimeout>;

type DisplayInfoType = {
    displayName:string
    profilePicture:string
    id: string | null
}

export type AuthContextType = {
    token: string | null
    isLogged: boolean
    autoLogout: boolean
    ResetAuto: ()=>void
    login:(token:string,expirationTime:string)=>void
    logout: ()=>void
    displayInfo: DisplayInfoType
}

const AuthContext = createContext<AuthContextType | null>(null)

function CalculateRemainingTime(expirationTime:string){
    const expirationDate = new Date(+expirationTime).getTime()
    const actualDate = new Date().getTime()

    const duration = expirationDate - actualDate
    
    return duration
}

export function AuthContextProvider({children}:{children:React.ReactNode}){
    const [token,setToken] = useState<string | null>(null)
    const [autoLogout, setAutoLogout] = useState(false)
    const [cacheImage,setCacheImage] = useState<string | null>(null)
    const [displayInfo, setDisplayInfo] = useState<DisplayInfoType>({id: null, displayName: "Guest",profilePicture: "https://find-your-job.s3.sa-east-1.amazonaws.com/icons/guest-profile.jpg"})
    
    const isLogged = !!token 
    
    const logout = useCallback(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        setToken(null)
        setDisplayInfo({id: null,displayName: "Guest",profilePicture: "https://find-your-job.s3.sa-east-1.amazonaws.com/icons/guest-profile.jpg"})
    
        clearTimeout(expireTimeout)
    },[])

    function login(token:string,expirationTime:string){
        // let expirationTime:string;

        updateDisplayInfo(token)

        //Access token variables to get expirationTime
        // let decoded:JwtPayload;
        
        // try{
        //     decoded = verify(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload
        // } catch(error){
        //     console.log(error)
        // }
        
        //Get expirationTime from token. 2 Hours.
        // expirationTime = (decoded!.exp! - 165600).toString()

        localStorage.setItem("token", token)
        localStorage.setItem("expirationTime",expirationTime)
        setToken(token)

        const durationTime = CalculateRemainingTime(expirationTime)
        expireTimeout = setTimeout(()=>{
            setAutoLogout(true)
            logout()
        },durationTime)
    }

    const updateDisplayInfo = useCallback(async (idToken:string)=>{
        const {name,profilePicture,id} = await getDisplayInfo(idToken)

        //Get first name to display on frontend
        const displayName = name.split(" ")[0]

        if(profilePicture !== displayInfo.profilePicture){
            setCacheImage(profilePicture)
            setDisplayInfo(state=> ({...state,displayName,id}))
        //If already logged in just set the profile picture url because is already downloaded on cache, 
        //so it will load faster.
        } else {
            setDisplayInfo({displayName,profilePicture,id})
        }
    },[displayInfo.profilePicture])

    const ResetAuto = useCallback(()=>{
        setAutoLogout(false)
    },[])

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        if(isLogged){
            const durationTime = CalculateRemainingTime(localStorage.getItem("expirationTime")!)
            if(durationTime < 6000){
                setAutoLogout(true)
                logout()
            } else {
                updateDisplayInfo(localStorage.getItem("token") as string)
                expireTimeout = setTimeout(()=>{
                    setAutoLogout(true)
                    logout()
                }, durationTime)
            }
        }
    },[isLogged, logout,updateDisplayInfo])

    useEffect(()=>{
        if(cacheImage){
            async function LoadProfilePicture(){                
                await new Promise((resolve,reject)=>{
                    const img = new Image()

                    img.src = cacheImage as string
                    img.onload = ()=>{
                        resolve(true)
                    }
                }).then((resolve)=>{
                    if(resolve){
                        setDisplayInfo(state=>({...state,profilePicture: cacheImage as string}))
                        setCacheImage(null)
                    }
                })
            }
            LoadProfilePicture()
        }
    },[cacheImage])

    const context = {
        token,
        isLogged,
        autoLogout,
        ResetAuto,
        login,
        logout,
        displayInfo,
    }


    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext