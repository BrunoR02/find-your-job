import { Job } from "../../helpers/typeDefs"
import styles from "./JobCard.module.css"

type PropsType = {
  data: Job
  addClass:string,
  activeHandler: ()=>void,
}

export default function JobCard({data,addClass,activeHandler}:PropsType){
  return (
    <li onClick={activeHandler} className={styles.card + " " + addClass}>
      <h4 className={styles.title}>{data.title}</h4>
      <span className={styles.companyName}>{data.company.name}</span>
      <p className={styles.description}>{data.description}</p>
      <span className={styles.location}>{data.locationNames ? data.locationNames : "Remote"}</span>
    </li>
  )
}