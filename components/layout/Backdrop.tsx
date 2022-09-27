import styles from "./Backdrop.module.css"

type PropsType = {
  onClickHandler?:()=>void
  onMouseEnterHandler?:()=>void
  transparent?: boolean
  zIndex?: number
}

export default function Backdrop({onClickHandler, onMouseEnterHandler,transparent,zIndex}:PropsType){
  return (
    <div 
      onClick={onClickHandler} 
      onMouseEnter={onMouseEnterHandler} 
      className={styles.backdrop + " " + (transparent && styles.transparent)}
      style={{zIndex}}>
    </div>
  )
}