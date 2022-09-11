import LoaderPlaceholder from "../layout/LoaderPlaceholder/LoaderPlaceholder"
import styles from "./TagList.module.css"

type PropsType = {
  list: {name: string}[],
}

export default function TagList({list}: PropsType){
  return (
    <ul className={styles.list}>
      {list.map(({name}:{name:string})=>{
        return <li key={name} className={styles.item}>{name}</li>
      })}
    </ul>
  )
}