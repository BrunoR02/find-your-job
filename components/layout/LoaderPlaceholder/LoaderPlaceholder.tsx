import { CSSProperties } from "react"
import styles from "./LoaderPlaceholder.module.css"

export default function LoaderPlaceholder({extraStyles}: {extraStyles:CSSProperties}){

  return (
    <div className={styles.loader} style={extraStyles}> 
      <div className={styles.loaderSwipe}></div>
    </div>
  )
}