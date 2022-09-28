import styles from "./MainTitle.module.css"

type PropsType = {
  title:string,
  extraClass?:string
}

export default function MainTitle({title,extraClass}:PropsType){
  return (
    <h3 className={styles.title + " " + extraClass}>{title}</h3>
  )
}