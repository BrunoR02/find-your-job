import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { actions } from "../../../src/stores/alert-store"
import AuthContext, { AuthContextType } from "../../../src/stores/authContext"
import FavoriteContext, { FavoriteContextType } from "../../../src/stores/FavoriteContext"
import LoadingSpinner from "../../LoadingSpinner"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  const [oldFavorites,setOldFavorites] = useState<string[]>([])
  const [loading,setLoading] = useState(false)

  const {favorites} = useContext(FavoriteContext) as FavoriteContextType
  const {logout,isLogged,autoLogout,ResetAuto} = useContext(AuthContext) as AuthContextType

  const dispatch = useDispatch()
  const router = useRouter()

  //Check if has added or removed a favorite job(saved job)
  const hasListChanged = favorites.length !== oldFavorites.length

  useEffect(()=>{
    //Give time to the animation to be completed before storing the oldFavorites list 
    if(hasListChanged){
      setTimeout(()=>{
        setOldFavorites(favorites)
      },1500)
    }
  },[favorites,oldFavorites,hasListChanged])
  
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
    <ul className={styles.navigation}>
      {loading && <LoadingSpinner/>}
      {isLogged && <Link href="/saved-jobs">
        <li className={styles.link + " " + (router.asPath ==="/saved-jobs" && styles.active)}>Saved Jobs 
          <span className={styles.favCounter + " " + (hasListChanged && styles.addFavoriteAnimation)}>{favorites.length}</span>
        </li></Link>}
      {!isLogged && <Link href="/login"><li className={styles.link + " " + (router.asPath ==="/login" && styles.active)}>Login</li></Link>}
      {!isLogged && <Link href="/register"><li className={styles.link + " " + (router.asPath ==="/register" && styles.active)}>Register</li></Link>}
      <Link href="/about"><li className={styles.link + " " + (router.asPath ==="/about" && styles.active)}>About</li></Link>
      {isLogged && <button className={styles.logoutButton} onClick={logoutHandler}>Logout</button>}
    </ul>
  )
}