import { useEffect, useState } from "react"
import { JobType } from "../../helpers/typeDefs"
import JobDetailsPlaceholder from "../layout/LoaderPlaceholder/JobDetailsPlaceholder"
import styles from "./JobDetails.module.css"
import SaveButton from "./SaveButton"
import TagList from "./TagList"

type PropsType = {
  data: JobType,
  loading?: boolean,
  closeMobileHandler: () => void,
}

export default function JobDetails({data,closeMobileHandler,loading}: PropsType){
  const [jobInfo,setJobInfo] = useState<JobType | null>(null)

  useEffect(()=>{
    if(data){
      setJobInfo(data)
    }
  },[data])

  return (
    <>
      {loading && <JobDetailsPlaceholder/>}

      <div className={styles.container}>
      {jobInfo && !loading && <>
        <section className={styles.topBar}>
          <h2 className={styles.title}>{jobInfo.title}</h2>

          <button onClick={closeMobileHandler} className={styles.closeMobile}></button>

          <div className={styles.actions}>
            <button className={styles.button}>Apply Now</button>
            <SaveButton jobId={jobInfo.id} />
          </div>
        </section>

        <TagList list={jobInfo.tags}/>

        <section className={styles.info}>
          <span className={styles.companyName}>{jobInfo.company.name}</span>
          <span className={styles.location}>{
            //Transform location data from API to readable to user.
            jobInfo.cities[0] && (jobInfo.cities[0].name + ((jobInfo.countries.length !== 0) && ", " + 
            jobInfo.countries[0].isoCode.toUpperCase() || "") + ((jobInfo.remotes[0]) ? " (On-site)" : " (Remote)" ))}
          </span>
        </section>
        
        <section className={styles.description}>
          <h4 className={styles.subtitle}>Job Description</h4>
          <p className={styles.text}>{jobInfo.description}</p>
        </section>
      </>}
    </div>
    </>
    
  )
}