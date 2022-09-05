import JobCard from "./JobCard";
import styles from "./JobList.module.css"
import jobCardStyles from "./JobCard.module.css"
import { useState } from "react";

type PropsType = {
  activeJob: number,
  activeHandler: (activeId:number) => void,
}

export default function JobList({activeJob,activeHandler}:PropsType){
  //Save active job id to turn it active, displaying the Job Details component and additional styles

  return (
    <ul className={styles.list}>
      <JobCard activeHandler={()=>activeHandler(1)} addClass={activeJob===1 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(2)} addClass={activeJob===2 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(3)} addClass={activeJob===3 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(4)} addClass={activeJob===4 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(5)} addClass={activeJob===5 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(6)} addClass={activeJob===6 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(7)} addClass={activeJob===7 ?jobCardStyles.active: ""}/>
      <JobCard activeHandler={()=>activeHandler(8)} addClass={activeJob===8 ?jobCardStyles.active: ""}/>
    </ul>
  )
}