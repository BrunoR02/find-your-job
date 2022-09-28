import styles from "./Backdrop.module.css"

type PropsType = {
  onClickHandler?:()=>void
  transparent?: boolean
  zIndex?: number
}

export default function Backdrop({onClickHandler, transparent,zIndex}:PropsType){
  return (
    <div 
      onClick={onClickHandler} 
      className={styles.backdrop + " " + (transparent && styles.transparent)}
      style={{zIndex}}>
    </div>
  )
}