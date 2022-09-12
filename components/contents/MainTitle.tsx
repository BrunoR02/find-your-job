import styles from "./MainTitle.module.css"

type PropsType = {
  title:string,
  extraClass?:string
}

export default function PageTitle({title,extraClass}:PropsType){
  return (
    <h3 className={styles.title + " " + extraClass}>{title}</h3>
  )
}