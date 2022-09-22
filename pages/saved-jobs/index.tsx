import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import MainTitle from "../../components/contents/MainTitle";
import JobDetails from "../../components/jobs/JobDetails";
import JobList from "../../components/jobs/JobList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ApolloErrorMessage from "../../components/messages/ApolloErrorMessage";
import NotFoundMessage from "../../components/messages/NotFoundMessage";

import { JobType } from "../../helpers/typeDefs";
import { GET_FAVORITE_JOBS } from "../../src/queries/jobs";
import AuthContext, { AuthContextType } from "../../src/stores/authContext";
import FavoriteContext, { FavoriteContextType } from "../../src/stores/FavoriteContext";

import styles from "../../styles/Home.module.css"

export default function SavedJobsPage(){
  const [activeId,setActiveId] = useState<string | null>(null)
  const [jobList,setJobList] = useState<JobType[]>([])

  const router = useRouter()

  const {isLogged} = useContext(AuthContext) as AuthContextType
  const {favorites,isLoading} = useContext(FavoriteContext) as FavoriteContextType

  const {data,loading,error} = useQuery(GET_FAVORITE_JOBS,{variables:{ids:favorites}})

  const jobData = useMemo(()=>data ? data.commitments[0].jobs : [],[data])

  useEffect(()=>{
    if(data && jobData.length !== jobList.length){
      setJobList(jobData)
      setActiveId(favorites[0])
    } 
  },[data,jobData,jobList,favorites])

  //Check if user has permission to see the page.
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      router.replace("/")
    }
  },[isLogged,router])

  if(error) return <ApolloErrorMessage error={error}/>

  return (
    <>
      <Head>
        <title>Saved Jobs</title>
        <meta name="description" content="List of Saved Jobs by the user"/>
      </Head>
      <MainTitle title="Saved Jobs" extraClass={styles.savedTitle}/>

      {loading && <LoadingSpinner/>}
      {!loading && (jobList.length===0) && <NotFoundMessage message="You don't have any favorites yet."/>}

      {(jobList.length > 0) && <div className={styles.container}>

        <JobList list={jobList} 
          activeId={activeId} 
          activeHandler={(activeId:string)=>setActiveId(activeId)}
          loadingPlaceholder={loading || isLoading}
        />

        {activeId && <JobDetails 
          data={data && jobList.find((job:JobType)=>job.id===activeId)} closeMobileHandler={()=>setActiveId(null)}
          loading={loading || isLoading}
        />}
      </div>}
    </>
    
  )
}