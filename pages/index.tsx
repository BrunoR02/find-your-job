import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useState } from 'react'
import JobDetails from '../components/jobs/JobDetails'
import JobList from '../components/jobs/JobList'
import LoadingSpinner from '../components/LoadingSpinner'
import { Job } from '../helpers/typeDefs'
import { GET_JOB_LIST } from '../src/queries/jobs'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [activeId,setActiveId] = useState<string | null>(null)

  const {data,loading,error,refetch} = useQuery(GET_JOB_LIST,{variables:{limit:10}})

  //Get Job list from API
  let jobList = data && data.commitments[0].jobs

  if(loading) return <LoadingSpinner/>
  if(error) return <p>Error to Fetch: {JSON.stringify(error)}</p>

  return (
    <div className={styles.container}>
      <JobList list={jobList} activeId={activeId} activeHandler={(activeId:string)=>setActiveId(activeId)}/>
      {activeId && <JobDetails data={data && jobList.find((job:Job)=>job.id===activeId)} activeId={activeId} closeMobileHandler={()=>setActiveId(null)}/>}
    </div>
  )
}

export default Home
