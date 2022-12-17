import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NewJobType } from "../../helpers/typeDefs"
import JobDetailsPlaceholder from "../layout/LoaderPlaceholder/JobDetailsPlaceholder"
import styles from "./JobDetails.module.css"
import JobLevelsList from "./JobLevelsList"
import SaveButton from "./SaveButton"
import TagList from "./TagList"

type PropsType = {
  data: NewJobType | undefined,
  loading?: boolean,
  closeMobileHandler: () => void,
}

export default function JobDetails({data,closeMobileHandler,loading}: PropsType){
  const router = useRouter()
  const [jobInfo,setJobInfo] = useState<NewJobType | null>(null)

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
            <Link href={jobInfo.applyUrl}><a target="_blank"><button className={styles.button}>Apply Now</button></a></Link> 
            <SaveButton jobId={jobInfo.id} closeDetails={
              //Close Details if it is mobile and is on saved-jobs page, so it can load smoother.
              isMobile && router.asPath.includes("saved-jobs") ? ()=>closeMobileHandler() : ()=>{}
              }/>
          </div>
        </section>

        <TagList list={jobInfo.tags.length>6?jobInfo.tags.splice(0,6):jobInfo.tags}/>

        <JobLevelsList list={jobInfo.jobLevels}/>

        <section className={styles.info}>
          <span className={styles.companyName}>{jobInfo.company}</span>
          <span className={styles.date}>{jobInfo.postedDate}</span>
          <span className={styles.location}>{jobInfo.location}</span>
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