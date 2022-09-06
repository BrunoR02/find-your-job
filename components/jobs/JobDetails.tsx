import { useState } from "react"
import { Job } from "../../helpers/typeDefs"
import styles from "./JobDetails.module.css"
import TagList from "./TagList"

type PropsType = {
  data: Job,
  activeId: string | null,
  closeMobileHandler: () => void,
}

export default function JobDetails({data,closeMobileHandler}: PropsType){
  const [saved,setSaved] = useState(false)

  function saveJobHandler(){
    setSaved(state=>!state)
    if(saved){
      
    }
  }

  return (
    <div className={styles.container}>
      {data && <>
        <section className={styles.topBar}>
          <h2 className={styles.title}>{data.title}</h2>
          <button onClick={closeMobileHandler} className={styles.closeMobile}></button>
          <div className={styles.actions}>
            <button className={styles.applyButton}>Apply Now</button>
            <button onClick={saveJobHandler} className={styles.saveButton}>Save</button>
          </div>
        </section>
        <TagList list={data.tags}/>
        <section className={styles.info}>
          <span className={styles.companyName}>{data.company.name}</span>
          <span className={styles.location}>{data.locationNames ? data.locationNames : "Remote"}</span>
        </section>
        <section className={styles.description}>
          <h4 className={styles.subtitle}>Job Description</h4>
          <p className={styles.text}>{data.description}</p>
        </section>
      </>}
      
    </div>
  )
}