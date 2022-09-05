import Link from "next/link";
import styles from "./Header.module.css"
import MainNavigation from "./MainNavigation";

export default function Header(){
  return (
    <div className={styles.header}>
      <Link href="/"><h2 className={styles.title}>Find Your Job</h2></Link>
      <MainNavigation/>
    </div>
  )
}