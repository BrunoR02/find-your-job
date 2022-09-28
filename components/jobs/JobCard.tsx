import { JobType } from "../../helpers/typeDefs"
import styles from "./JobCard.module.css"

type PropsType = {
  data: JobType,
  addClass: string,
  activeHandler: ()=>void,
}

export default function JobCard({data,addClass,activeHandler}:PropsType){

  //Make a readable location and workplace with the data got from GraphQL Jobs API
  let location = data.cities[0] && (data.cities[0].name + ((data.countries.length !== 0) && ", " + data.countries[0].isoCode.toUpperCase() || "") + ((data.remotes.length !== 0) && " (Remote)" || " (On-site)"))

  return (
    <li onClick={activeHandler} className={styles.card + " " + addClass}>
      <h4 className={styles.title}>{data.title}</h4>
      <span className={styles.companyName}>{data.company.name}</span>
      <p className={styles.description}>{data.description}</p>
      <span className={styles.location}>
        {location}
      </span>
    </li>
  )
}