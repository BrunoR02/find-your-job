import { useContext, useEffect, useState } from "react"
import { JobType } from "../../helpers/typeDefs"
import FavoriteContext from "../../src/store/FavoriteContext"
import styles from "./JobDetails.module.css"
import TagList from "./TagList"

type PropsType = {
  data: JobType,
  closeMobileHandler: () => void,
}

export default function JobDetails({data,closeMobileHandler}: PropsType){
  const [jobInfo,setJobInfo] = useState<JobType>(data)
  const {favorites,addFavorite,removeFavorite} = useContext(FavoriteContext)
  const [saved,setSaved] = useState<boolean>(jobInfo && favorites.some(favId=>favId===jobInfo.id))

  let alreadySaved = jobInfo && favorites.some(favId=>favId===jobInfo.id)

  useEffect(()=>{
    setSaved(!!alreadySaved)
  },[alreadySaved])

  function saveHandler(){
    setSaved(state=>!state)
    if(!saved){
      addFavorite(data.id)
    } else {
      removeFavorite(data.id)
    }
  }

  useEffect(()=>{
    if(data){
      setJobInfo(data)
    }
  },[data])

  //Make a readable location and workplace with the data got from GraphQL Jobs API
  let location; 
  if(data) location = data.cities[0] && (data.cities[0].name + ((data.countries.length !== 0) && ", " + data.countries[0].isoCode.toUpperCase() || "") + ((data.remotes[0]) ? " (On-site)" : " (Remote)" ))

  return (
    <div className={styles.container}>

      {jobInfo && <>
        <section className={styles.topBar}>
          <h2 className={styles.title}>{jobInfo.title}</h2>
          <button onClick={closeMobileHandler} className={styles.closeMobile}></button>
          <div className={styles.actions}>
            <button className={styles.applyButton}>Apply Now</button>
            <button onClick={saveHandler} className={styles.saveButton + " " + (saved && styles.saveActive)}>{!saved ? "Save" : "Saved"}</button>
          </div>
        </section>
        <TagList list={jobInfo.tags}/>
        <section className={styles.info}>
          <span className={styles.companyName}>{jobInfo.company.name}</span>
          <span className={styles.location}>{location}</span>
        </section>
        <section className={styles.description}>
          <h4 className={styles.subtitle}>Job Description</h4>
          <p className={styles.text}>{jobInfo.description}</p>
        </section>
      </>}
      
    </div>
  )
}