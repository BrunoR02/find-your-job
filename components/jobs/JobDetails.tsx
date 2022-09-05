import styles from "./JobDetails.module.css"
import TagList from "./TagList"

type PropsType = {
  closeMobileHandler: () => void,
}

export default function JobDetails({closeMobileHandler}: PropsType){
  return (
    <div className={styles.container}>
      <section className={styles.topBar}>
        <h2 className={styles.title}>Fullstack Developer</h2>
        <button onClick={closeMobileHandler} className={styles.closeMobile}></button>
        <div className={styles.actions}>
          <button className={styles.applyButton}>Apply Now</button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </section>
      
      <TagList/>
      <section className={styles.info}>
        <span className={styles.companyName}>Amazon</span>
        <span className={styles.location}>California, TX</span>
      </section>
      <section className={styles.description}>
        <h4 className={styles.subtitle}>Job Description</h4>
        <p className={styles.text}>Lorem Ipsum is simply dummy text of the 
      printing and typesetting industry. Lorem Ipsum has been the industry's standard 
      dummy text ever since the 1500s, when an unknown printer took a galley of type and 
      scrambled it to make a type specimen book. It has survived not only five centuries, 
      but also the leap into electronic typesetting, remaining essentially unchanged. It was 
      popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </section>
    </div>
  )
}