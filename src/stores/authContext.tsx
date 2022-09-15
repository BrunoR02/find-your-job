import React, { createContext, useCallback, useEffect, useState } from "react"
import {JwtPayload, verify} from "jsonwebtoken"

let expireTimeout: ReturnType<typeof setTimeout>;

export type AuthContextType = {
    token: string | null
    isLogged: boolean
    autoLogout: boolean
    ResetAuto: ()=>void
    login:(token:string)=>void
    logout: ()=>void
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
    
    const isLogged = !!token 
    
    const logout = useCallback(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        setToken(null)
    
        clearTimeout(expireTimeout)
    },[])

    function login(token:string){
        let expirationTime:string;

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

    const context = {
        token,
        isLogged,
        autoLogout,
        ResetAuto,
        login,
        logout,
    }


    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext