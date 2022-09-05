import styles from "./TagList.module.css"

export default function TagList(){
  return (
    <ul className={styles.list}>
      <li className={styles.item}>React</li>
      <li className={styles.item}>Node</li>
      <li className={styles.item}>GraphQL</li>
      <li className={styles.item}>React Native</li>
      <li className={styles.item}>MySQL</li>
      <li className={styles.item}>DevOps</li>
      <li className={styles.item}>MongoDB</li>
    </ul>
  )
}