import Link from "next/link"
import styles from "./MainNavigation.module.css"

export default function MainNavigation(){
  return (
    <nav>
      <ul className={styles.navigation}>
        <Link href="/login"><li className={styles.link}>Login</li></Link>
        <Link href="/registro"><li className={styles.link}>Registro</li></Link>
        <Link href="/sobre"><li className={styles.link}>Sobre</li></Link>
      </ul>
    </nav>
  )
}