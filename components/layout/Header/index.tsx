import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, RootState } from "../../../src/stores/alert-store";
import Alert from "../../helpers/Alert";
import styles from "./Header.module.css"
import MainNavigation from "./MainNavigation";
import ProfileMenu from "./ProfileMenu";

export default function Header(){
  const dispatch = useDispatch()
  const alertOn = useSelector((state:RootState)=>state.alertOn)

  useEffect(()=>{
    if(sessionStorage.getItem("alert")){
      const {type,message} = JSON.parse(sessionStorage.getItem("alert") as string)
      sessionStorage.removeItem("alert")
      dispatch(actions.createAlert({type,message}))
    }
  },[dispatch])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/"><h2 className={styles.title}>Find Your Job</h2></Link>
        <div className={styles.nav}>
          <MainNavigation/>
          <ProfileMenu/>
        </div>
      </div>
      {alertOn && <Alert/>}
    </header>
  )
}