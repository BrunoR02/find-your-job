import styles from "./BioText.module.css"

type PropsType ={
  text: string
}

export default function BioText({text}:PropsType){
  return (
    <section className={styles.container}>
      <h5 className={styles.title}>Bio</h5>
      <p className={styles.text}>{text}</p>
    </section>
  )
}