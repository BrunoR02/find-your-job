import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/stores/alert-store";
import Alert from "../../helpers/Alert";
import styles from "./Header.module.css"
import MainNavigation from "./MainNavigation";

export default function Header(){

  const alertOn = useSelector((state:RootState)=>state.alertOn)

  return (
    <header className={styles.header}>
      <Link href="/"><h2 className={styles.title}>Find Your Job</h2></Link>
      <MainNavigation/>
      {alertOn && <Alert/>}
    </header>
  )
}