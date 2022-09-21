import React, { createContext, useCallback, useEffect, useState } from "react"
import {JwtPayload, verify} from "jsonwebtoken"
import getUserData, { UserDataType } from "../../helpers/getUserData";

let expireTimeout: ReturnType<typeof setTimeout>;

type DisplayInfoType = {
    displayName:string
    profilePicture:string
}

export type AuthContextType = {
    token: string | null
    isLogged: boolean
    autoLogout: boolean
    ResetAuto: ()=>void
    login:(token:string)=>void
    logout: ()=>void
    displayInfo: DisplayInfoType
}

const AuthContext = createContext<AuthContextType | null>(null)


function CalculateRemainingTime(expirationTime:string){
    const expirationDate = new Date(+expirationTime * 1000).getTime()
    const actualDate = new Date().getTime()

    const duration = expirationDate - actualDate
    
    return duration
}

export function AuthContextProvider({children}:{children:React.ReactNode}){
    const [token,setToken] = useState<string | null>(null)
    const [autoLogout, setAutoLogout] = useState(false)
    const [cacheImage,setCacheImage] = useState<string | null>(null)
    const [displayInfo, setDisplayInfo] = useState<DisplayInfoType>({displayName: "Guest",profilePicture: "https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/guest-profile.png"})
    
    const isLogged = !!token 
    
    const logout = useCallback(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        setToken(null)
        setDisplayInfo({displayName: "Guest",profilePicture: "https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/guest-profile.png"})
    
        clearTimeout(expireTimeout)
    },[])

    function login(token:string){
        let expirationTime:string;

        updateDisplayInfo(token)

        //Access token variables to get expirationTime
        let decoded:JwtPayload;
        try{
            decoded = verify(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload
        } catch(error){
            console.log(error)
        }
        
        //Get expirationTime from token
        expirationTime = decoded!.exp!.toString()

        localStorage.setItem("token", token)
        localStorage.setItem("expirationTime",expirationTime!)
        setToken(token)

        const durationTime = CalculateRemainingTime(expirationTime!)
        expireTimeout = setTimeout(()=>{
            setAutoLogout(true)
            logout()
        },durationTime)
    }

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        if(isLogged){
            updateDisplayInfo(localStorage.getItem("token") as string)
            const durationTime = CalculateRemainingTime(localStorage.getItem("expirationTime")!)
            if(durationTime < 6000){
                setAutoLogout(true)
                logout()
            } else {
                expireTimeout = setTimeout(()=>{
                    setAutoLogout(true)
                    logout()
                }, durationTime)
            }
        }
    },[isLogged, logout])

    const ResetAuto = useCallback(()=>{
        setAutoLogout(false)
    },[])

    async function updateDisplayInfo(idToken:string){
        const {name,profilePicture} = await getUserData(idToken)

        //Get first name to display on frontend
        const displayName = name.split(" ")[0]

        //Execute only first time when logged in to download profile picture on cache
        if(!token){
            setCacheImage(profilePicture)
            setDisplayInfo(state=> ({...state,displayName}))
        //If already logged in just set the profile picture url because is already downloaded on cache, 
        //so it will load faster.
        } else {
            setDisplayInfo({displayName,profilePicture})
        }
    }

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