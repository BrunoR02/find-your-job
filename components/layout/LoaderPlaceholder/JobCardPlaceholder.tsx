import styles from "../../jobs/JobCard.module.css"
import LoaderPlaceholder from "./LoaderPlaceholder"

export default function JobCardPlaceholder(){

  return (
    <li className={styles.card}>
      <LoaderPlaceholder extraStyles={{width:"60%",height: "27px"}}/>

      <LoaderPlaceholder extraStyles={{width:"25%",height: "20px",margin: "15px 0"}}/>

      <LoaderPlaceholder extraStyles={{width:"90%",height: "1em",marginBottom:"5px"}}/>
      <LoaderPlaceholder extraStyles={{width:"100%",height: "1em",marginBottom:"5px"}}/>
      <LoaderPlaceholder extraStyles={{width:"85%",height: "1em",marginBottom:"5px"}}/>
      <LoaderPlaceholder extraStyles={{width:"75%",height: "1em"}}/>
      <LoaderPlaceholder extraStyles={{width:"40%",height: "20px",marginTop: "15px",margin: "15px 0 0 auto"}}/>
    </li>
  )
}