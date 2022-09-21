import styles from "./Backdrop.module.css"

type PropsType = {
  onClickHandler?:()=>void
  onMouseEnterHandler?:()=>void
  transparent?: boolean
}

export default function Backdrop({onClickHandler, onMouseEnterHandler,transparent}:PropsType){
  return (
    <div onClick={onClickHandler} onMouseEnter={onMouseEnterHandler} className={styles.backdrop + " " + (transparent && styles.transparent)}></div>
  )
}