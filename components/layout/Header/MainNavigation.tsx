import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AuthContext, { AuthContextType } from "../../../src/stores/AuthContext"
import FavoriteContext, { FavoriteContextType } from "../../../src/stores/FavoriteContext"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  const [oldFavorites,setOldFavorites] = useState<string[]>([])

  const {favorites} = useContext(FavoriteContext) as FavoriteContextType
  const {isLogged} = useContext(AuthContext) as AuthContextType
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

  return (
    <ul className={styles.navigation}>
      {isLogged && <Link href="/saved-jobs">
        <li className={styles.link}>Saved Jobs 
          <span className={styles.favCounter + " " + (hasListChanged && styles.addFavoriteAnimation)}>{favorites.length}</span>
        </li></Link>}
      <Link href="/about"><li className={styles.link}>About</li></Link>
    </ul>
  )
}