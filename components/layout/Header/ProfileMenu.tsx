import Image from "next/image";
import Link from "next/link";
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
  
  function logoutHandler(){
    logout()
    setLoading(true)
    setTimeout(()=>{
      dispatch(actions.createAlert({type:"success",message:"You are now logged out."}))
      setLoading(false)
    },1500)
  }

  useEffect(()=>{
    if(autoLogout){
      dispatch(actions.createAlert({type:"warning",message:"Session expired. Login back again."}))
      ResetAuto()
    }
  },[autoLogout,dispatch,ResetAuto])

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

