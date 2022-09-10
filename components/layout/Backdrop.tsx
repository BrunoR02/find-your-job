import styles from "./Backdrop.module.css"

export default function Backdrop({onClickHandler}:{onClickHandler:()=>void}){
  return (
    <div onClick={onClickHandler} className={styles.backdrop}></div>
  )
}