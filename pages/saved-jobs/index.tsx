import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import MainTitle from "../../components/contents/MainTitle";
import JobDetails from "../../components/jobs/JobDetails";
import JobList from "../../components/jobs/JobList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ApolloErrorMessage from "../../components/messages/ApolloErrorMessage";
import NotFoundMessage from "../../components/messages/NotFoundMessage";

import { JobType } from "../../helpers/typeDefs";
import { GET_FAVORITE_JOBS } from "../../src/queries/jobs";
import FavoriteContext from "../../src/stores/FavoriteContext";

import styles from "../../styles/Home.module.css"

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

  if(error) return <ApolloErrorMessage error={error}/>

  return (
    <>
      <Head>
        <title>Saved Jobs</title>
        <meta name="description" content="List of Saved Jobs by the user"/>
      </Head>
      <MainTitle title="Saved Jobs" extraClass={styles.savedTitle}/>
      
      {loading && <LoadingSpinner/>}
      
      {!loading && jobList.length===0 && <NotFoundMessage message="You don't have any favorites yet."/>}

      {!loading && <div className={styles.container}>

        {data && (<JobList list={jobList} 
        activeId={activeId} 
        activeHandler={(activeId:string)=>setActiveId(activeId)}
        />)}

        {activeId && (<JobDetails 
        data={data && jobList.find((job:JobType)=>job.id===activeId)} closeMobileHandler={()=>setActiveId(null)}/>)}
      </div>}
    </>
    
  )
}