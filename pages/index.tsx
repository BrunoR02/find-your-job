import { ServerError, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import JobDetails from '../components/jobs/JobDetails'
import JobList from '../components/jobs/JobList'
import { Job } from '../helpers/typeDefs'
import { GET_JOB_LIST } from '../src/queries/jobs'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [pagination,setPagination] = useState(1)

  const {data,loading,error,refetch} = useQuery(GET_JOB_LIST,{variables:{limit:10*pagination}})
  //Save active job id to turn it active, displaying the Job Details component and additional styles
  const [activeId,setActiveId] = useState<string | null>(null)
  const [jobList, setJobList] = useState<Job[]>([])

  useEffect(()=>{
    if(data){
      if(pagination > 1){
        refetch({limit:10*pagination})
      }
      //Save Job list from API
      setJobList(data && data.commitments[0].jobs)
      if(pagination === 1){
        setActiveId(data.commitments[0].jobs[0].id)
      }
    }
  },[pagination,data])
  
  if(error) return <div className={styles.errorMessage}>Error to Fetch (GRAPHQL): {
    error.networkError && JSON.stringify((error.networkError as ServerError).result?.errors[0].message) || 
    error.message && JSON.stringify(error.message)
  }</div>

  return (
    <div className={styles.container}>
      <JobList list={jobList} 
        activeId={activeId} 
        activeHandler={(activeId:string)=>setActiveId(activeId)}
        loadMoreHandler={()=>{setPagination(state=>state+1)}}
        pagination={pagination}
        loading={loading}
      />
      {activeId && <JobDetails 
        data={data && jobList.find((job:Job)=>job.id===activeId)}
        closeMobileHandler={()=>setActiveId(null)}
      />}
    </div>
  )
}

export default Home
