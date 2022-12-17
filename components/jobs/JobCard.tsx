import { NewJobType } from "../../helpers/typeDefs"
import styles from "./JobCard.module.css"

type PropsType = {
  data: NewJobType,
  addClass: string,
  activeHandler: ()=>void,
}

export default function JobCard({data,addClass,activeHandler}:PropsType){

  //Make a readable location and workplace with the data got from GraphQL Jobs API
  // let location = data.cities[0] && (data.cities[0].name + ((data.countries.length !== 0) && ", " + data.countries[0].isoCode.toUpperCase() || "") + ((data.remotes.length !== 0) && " (Remote)" || " (On-site)"))

  return (
    <li onClick={activeHandler} className={styles.card + " " + addClass}>
      <div className={styles.topBar}>
        <h4 className={styles.title}>{data.title}</h4>
        <span className={styles.jobLevel}>{data.jobLevels[0]}</span>
      </div>
      <span className={styles.companyName}>{data.company}</span>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.info}>
        <span className={styles.date}>{data.postedDate}</span>
        <span className={styles.location}>
          {data.location}
        </span>
      </div>
    </li>
  )
}