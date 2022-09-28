import { useRouter } from "next/router"
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
  const router = useRouter()
  const [jobInfo,setJobInfo] = useState<JobType | null>(null)

  let isMobile = false
  if (typeof window !== 'undefined') {
    isMobile = (window  as Window).innerWidth < 768
  }

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
            <SaveButton jobId={jobInfo.id} closeDetails={
              //Close Details if it is mobile and is on saved-jobs page, so it can load smoother.
              isMobile && router.asPath.includes("saved-jobs") ? ()=>closeMobileHandler() : ()=>{}
              }/>
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