import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../src/stores/alert-store";
import AuthContext, { AuthContextType } from "../../../src/stores/AuthContext";
import LoadingSpinner from "../../LoadingSpinner";
import Backdrop from "../Backdrop";

import styles from "./ProfileMenu.module.css"

export default function ProfileMenu(){
  const {displayInfo} = useContext(AuthContext) as AuthContextType
  const [menuActive,setMenuActive] = useState(false)
  const [loading,setLoading] = useState(false)

  const {isLogged,logout,autoLogout,ResetAuto} = useContext(AuthContext) as AuthContextType
  const dispatch = useDispatch()
  const router = useRouter()
  
  function logoutHandler(){
    const alert = {type: "success",message:"You are now signed out."}
    sessionStorage.setItem("alert",JSON.stringify(alert))
    setLoading(true)
    setTimeout(()=>{
      logout()
      setLoading(false)
      router.reload()
    },1000)
  }

  useEffect(()=>{
    if(autoLogout){
      dispatch(actions.createAlert({type:"warning",message:"Session expired. Login back again."}))
      ResetAuto()
    }
  },[autoLogout,dispatch,ResetAuto])

  useEffect(()=>{
    if(sessionStorage.getItem("alert")){
      const {type,message} = JSON.parse(sessionStorage.getItem("alert") as string)
      sessionStorage.removeItem("alert")
      dispatch(actions.createAlert({type,message}))
    }
  },[dispatch])

  return (
    <>
    {loading && <LoadingSpinner/>}
    {menuActive && <Backdrop onMouseEnterHandler={()=>setMenuActive(false)} transparent></Backdrop>}
    <button className={styles.container} onMouseEnter={()=>setMenuActive(true)}>
      <Image className={styles.picture} src={displayInfo.profilePicture} width="40%" height="40%"/>
      <p className={styles.displayName}>{displayInfo.displayName}</p>
      <ul className={styles.menu + " " + (menuActive && styles.menuActive)}>
        {isLogged && <Link href="/profile"><li className={styles.option}>Profile</li></Link>}
        {!isLogged && <Link href="/login"><li className={styles.option}>Login</li></Link>}
        {!isLogged && <Link href="/signup"><li className={styles.option}>Sign up</li></Link>}
        {isLogged && <li className={styles.option} onClick={logoutHandler}>Logout</li>}
      </ul>
    </button>
    </>
  )
}

