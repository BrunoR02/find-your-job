import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { JobType } from "../../helpers/typeDefs"
import { actions } from "../../src/stores/alert-store"
import AuthContext from "../../src/stores/authContext"
import FavoriteContext from "../../src/stores/FavoriteContext"
import JobDetailsPlaceholder from "../layout/LoaderPlaceholder/JobDetailsPlaceholder"
import styles from "./JobDetails.module.css"
import TagList from "./TagList"

type PropsType = {
  data: JobType,
  loading?: boolean,
  closeMobileHandler: () => void,
}

export default function JobDetails({data,closeMobileHandler,loading}: PropsType){
  const [jobInfo,setJobInfo] = useState<JobType>(data)
  const {favorites,addFavorite,removeFavorite} = useContext(FavoriteContext)
  const [saved,setSaved] = useState<boolean>(jobInfo && favorites.some(favId=>favId===jobInfo.id))

  const {isLogged} = useContext(AuthContext)

  const router = useRouter()
  const dispatch = useDispatch()

  let alreadySaved = jobInfo && favorites.some(favId=>favId===jobInfo.id)

  useEffect(()=>{
    setSaved(!!alreadySaved)
  },[alreadySaved])

  function saveHandler(){
    if(isLogged){
      setSaved(state=>!state)
      if(!saved){
        addFavorite(data.id)
      } else {
        removeFavorite(data.id)
      }
    } else {
      dispatch(actions.createAlert({type:"warning",message:"Log in first to be able to save jobs."}))
      router.push("login")
    }
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
            <button className={styles.applyButton}>Apply Now</button>
            <button onClick={saveHandler} className={styles.saveButton + " " + (saved && styles.saveActive)}>{!saved ? "Save" : "Saved"}</button>
          </div>
        </section>
        <TagList list={jobInfo.tags}/>
        <section className={styles.info}>
          <span className={styles.companyName}>{jobInfo.company.name}</span>
          <span className={styles.location}>{
            jobInfo.cities[0] && (jobInfo.cities[0].name + ((jobInfo.countries.length !== 0) && ", " + 
            jobInfo.countries[0].isoCode.toUpperCase() || "") + ((jobInfo.remotes[0]) ? " (On-site)" : " (Remote)" ))}
          </span>
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