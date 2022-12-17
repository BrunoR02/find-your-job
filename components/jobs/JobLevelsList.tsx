import styles from "./JobLevelsList.module.css"

type PropsType = {
  list: string[]
}

export default function JobLevelsList({list}:PropsType){
  return (
    <div className={styles.list}>
      {list.map(level=><span key={level} className={styles.item}>{level}</span>)}
    </div>
  )
}