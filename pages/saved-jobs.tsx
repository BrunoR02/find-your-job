import { ServerError, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import JobDetails from "../components/jobs/JobDetails";
import JobList from "../components/jobs/JobList";
import LoadingSpinner from "../components/LoadingSpinner";
import { Job } from "../helpers/typeDefs";
import { GET_FAVORITE_JOBS } from "../src/queries/jobs";
import FavoriteContext from "../src/store/FavoriteContext";
import styles from "../styles/Home.module.css"

export default function SavedJobsPage(){
  const [activeId,setActiveId] = useState<string | null>(null)

  const {favorites} = useContext(FavoriteContext)

  const {data,loading,error} = useQuery(GET_FAVORITE_JOBS,{variables:{ids:favorites}})

  useEffect(()=>{
    if(data){
      setActiveId(favorites[0])
    } 
  },[data])

  let jobList = data ? data.commitments[0].jobs : []

  if(error) return (<div className={styles.errorMessage}>Error to Fetch (GRAPHQL): {
    error.networkError && JSON.stringify((error.networkError as ServerError).result?.errors[0].message) || 
    error.message && JSON.stringify(error.message)}
  </div>)

  return (
    <>
      <h3 className={styles.savedTitle}>Saved Jobs</h3>
      
      {loading && <LoadingSpinner/>}

      {!loading && <div className={styles.container}>
        {favorites.length === 0 && <div className={styles.alertMessage}>You don't have any favorites yet.</div>}

        {data && (<JobList list={jobList} 
        activeId={activeId} 
        activeHandler={(activeId:string)=>setActiveId(activeId)}
        />)}

        {activeId && (<JobDetails 
        data={data && jobList.find((job:Job)=>job.id===activeId)} closeMobileHandler={()=>setActiveId(null)}/>)}
      </div>}
    </>
    
  )
}