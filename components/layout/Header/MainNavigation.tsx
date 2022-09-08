import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import FavoriteContext from "../../../src/store/FavoriteContext"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  const router = useRouter()
  const [oldFavorites,setOldFavorites] = useState<string[]>([])

  const {favorites} = useContext(FavoriteContext)

  //Check if has added or removed a favorite job(saved job)
  const hasListChanged = favorites.length !== oldFavorites.length

  useEffect(()=>{
    //Give time to the animation to be completed before storing the oldFavorites list 
    if(hasListChanged){
      setTimeout(()=>{
        setOldFavorites(favorites)
      },1500)
    }
  },[favorites,oldFavorites])

  return (
    <nav>
      <ul className={styles.navigation}>
        <Link href="/saved-jobs"><li className={styles.link + " " + (router.asPath ==="/saved-jobs" && styles.active)}>Saved Jobs <span className={styles.favCounter + " " + (hasListChanged && styles.addFavoriteAnimation)}>{favorites.length}</span></li></Link>
        <Link href="/login"><li className={styles.link + " " + (router.asPath ==="/login" && styles.active)}>Login</li></Link>
        <Link href="/register"><li className={styles.link + " " + (router.asPath ==="/register" && styles.active)}>Register</li></Link>
        <Link href="/about"><li className={styles.link + " " + (router.asPath ==="/about" && styles.active)}>About</li></Link>
      </ul>
    </nav>
  )
}