import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./LoadingSpinner.module.css"

export default function LoadingPage(){
  const router = useRouter()
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const handleStart = (url:string) => (url !== router.asPath) && setLoading(true)
    const handleComplete = () => setLoading(false)
    
    router.events.on("routeChangeStart",handleStart)
    router.events.on("routeChangeComplete",handleComplete)
    router.events.on("routeChangeError",handleComplete)

    return ()=>{
      router.events.off("routeChangeStart",handleStart)
      router.events.on("routeChangeComplete",handleComplete)
      router.events.on("routeChangeError",handleComplete)
    }
  },[router])

  return loading ? (<div className={styles.loading}></div>) : <></>
}