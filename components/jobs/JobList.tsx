import JobCard from "./JobCard";
import styles from "./JobList.module.css"
import jobCardStyles from "./JobCard.module.css"
import { useState } from "react";

export default function JobList(){
  //Save active job id to turn it active, displaying the Job Details component and additional styles
  const [activeJob,setActiveJob] = useState(0)

  return (
    <ul className={styles.list}>
      <JobCard activeHandler={()=>setActiveJob(1)} addClass={activeJob===1 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>setActiveJob(2)} addClass={activeJob===2 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>setActiveJob(3)} addClass={activeJob===3 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>setActiveJob(4)} addClass={activeJob===4 ?jobCardStyles.active: ""}/>
    </ul>
  )
}