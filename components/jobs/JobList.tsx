import JobCard from "./JobCard";
import styles from "./JobList.module.css"
import jobCardStyles from "./JobCard.module.css"
import { Job } from "../../helpers/typeDefs";

type PropsType = {
  list: Job[],
  activeId: string | null,
  activeHandler: (activeId:string) => void,
}

export default function JobList({list,activeId,activeHandler}:PropsType){
  //Save active job id to turn it active, displaying the Job Details component and additional styles

  return (
    <ul className={styles.list}>
      {list.map((job:Job)=>{
        return <JobCard key={job.id} data={job} activeHandler={()=>activeHandler(job.id)} addClass={activeId===job.id ?jobCardStyles.active: ""}/>
      })}
    </ul>
  )
}