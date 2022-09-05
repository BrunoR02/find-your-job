import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  const router = useRouter()

  return (
    <nav>
      <ul className={styles.navigation}>
        <Link href="/applications"><li className={styles.link + " " + (router.asPath ==="/applications" && styles.active)}>My applications</li></Link>
        <Link href="/login"><li className={styles.link + " " + (router.asPath ==="/login" && styles.active)}>Login</li></Link>
        <Link href="/register"><li className={styles.link + " " + (router.asPath ==="/register" && styles.active)}>Register</li></Link>
        <Link href="/about"><li className={styles.link + " " + (router.asPath ==="/about" && styles.active)}>About</li></Link>
      </ul>
    </nav>
  )
}