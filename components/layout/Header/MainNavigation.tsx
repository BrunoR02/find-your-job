import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import FavoriteContext from "../../../src/store/FavoriteContext"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  const router = useRouter()

  const {favorites} = useContext(FavoriteContext)

  return (
    <nav>
      <ul className={styles.navigation}>
        <Link href="/saved-jobs"><li className={styles.link + " " + (router.asPath ==="/saved-jobs" && styles.active)}>Saved Jobs [{favorites.length}]</li></Link>
        <Link href="/login"><li className={styles.link + " " + (router.asPath ==="/login" && styles.active)}>Login</li></Link>
        <Link href="/register"><li className={styles.link + " " + (router.asPath ==="/register" && styles.active)}>Register</li></Link>
        <Link href="/about"><li className={styles.link + " " + (router.asPath ==="/about" && styles.active)}>About</li></Link>
      </ul>
    </nav>
  )
}