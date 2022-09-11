import styles from "../../jobs/JobDetails.module.css"
import LoaderPlaceholder from "./LoaderPlaceholder"
import TagListPlaceholder from "./TagListPlaceholder"

export default function JobDetailsPlaceholder(){

  return (
    <div className={styles.container}>
      <section className={styles.topBar}>
        <LoaderPlaceholder extraStyles={{width:"50%",height: "35px"}}/>

        <button className={styles.closeMobile}></button>
        <div className={styles.actions}>
          <button className={styles.applyButton}>Apply Now</button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </section>
      <TagListPlaceholder/>
      <section className={styles.info}>
        <LoaderPlaceholder extraStyles={{width:"10%",height: "25px"}}/>
        <LoaderPlaceholder extraStyles={{width:"30%",height: "25px"}}/>
      </section>
      <section className={styles.description}>
        <LoaderPlaceholder extraStyles={{width:"30%",height: "25px",margin: "30px 0"}}/>

        <LoaderPlaceholder extraStyles={{width:"100%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"100%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"95%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"80%",height: "20px",marginBottom:"30px"}}/>

        <LoaderPlaceholder extraStyles={{width:"100%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"100%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"95%",height: "20px",marginBottom:"10px"}}/>
        <LoaderPlaceholder extraStyles={{width:"80%",height: "20px",marginBottom:"10px"}}/>
      </section>
    </div>
  )
}