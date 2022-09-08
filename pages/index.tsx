import { ServerError, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FilterMenu from '../components/filters/FilterMenu'
import JobDetails from '../components/jobs/JobDetails'
import JobList from '../components/jobs/JobList'
import LoadingSpinner from '../components/LoadingSpinner'
import ApolloErrorMessage from '../components/messages/ApolloErrorMessage'
import NotFoundMessage from '../components/messages/NotFoundMessage'
import { FiltersType, JobType } from '../helpers/typeDefs'
import { GET_JOB_LIST } from '../src/queries/jobs'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [pagination,setPagination] = useState(1)
  const [filters,setFilters] = useState({search:""})
  //Activate when any of the filters is updated to allow refetching, controlling the calls to the GraphQL API.
  const [hasFiltersUpdated, setHasFiltersUpdated] = useState(false)
  const {data,loading,error,refetch,networkStatus} = useQuery(GET_JOB_LIST,{variables:{limit:10*pagination,searchTitle:filters.search},fetchPolicy:"network-only",notifyOnNetworkStatusChange:true})
  //Retrieved Job Data that came from GraphQL Jobs API
  let jobsData = data && data.commitments[0].jobs || []

  //Save active job id to turn it active, displaying the Job Details component and additional styles
  const [activeId,setActiveId] = useState<string | null>(null)
  //State to save the retrieved Jobs list that came from Graphql Jobs API.
  const [jobList, setJobList] = useState<JobType[]>([])

  useEffect(()=>{
    if(data){
      //Save Job list from API
      setJobList(data && jobsData)
      if(pagination === 1 && jobsData.length !== 0){
        setActiveId(jobsData[0].id)
      }
    }
  },[pagination,data,filters])

  //Show error on fetching Job List
  if(error) return <ApolloErrorMessage error={error}/>

  return (
    <>
      <FilterMenu setFilters={(filtersParams:FiltersType)=>{setFilters(filtersParams);setHasFiltersUpdated(true)}}/>
      
      {loading && <LoadingSpinner/>}
      {!loading && (jobsData.length === 0) && <NotFoundMessage message="Found no jobs with that title. Try again."/>}

      {(jobList.length > 0) && <div className={styles.container}>
        <JobList list={jobList} 
          activeId={activeId} 
          activeHandler={(activeId:string)=>setActiveId(activeId)}
          loadMoreHandler={()=>{setPagination(state=>state+1)}}
          pagination={pagination}
          loading={loading}
        />
        {activeId && <JobDetails 
          data={data && jobList.find((job:JobType)=>job.id===activeId)}
          closeMobileHandler={()=>setActiveId(null)}
        />}
      </div>}
    </>
  )
}

export default Home
