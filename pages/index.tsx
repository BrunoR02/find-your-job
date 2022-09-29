import { ApolloError, ApolloQueryResult, ServerError, ServerParseError, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import FilterMenu from '../components/filters/FilterMenu'
import JobDetails from '../components/jobs/JobDetails'
import JobList from '../components/jobs/JobList'
import LoadingSpinner from '../components/LoadingSpinner'
import ApolloErrorMessage from '../components/messages/ApolloErrorMessage'
import NotFoundMessage from '../components/messages/NotFoundMessage'
import userClient from '../config/ApolloClients/UsersClient'
import { FiltersType, JobType } from '../helpers/typeDefs'
import { GET_JOB_LIST, GET_JOB_LIST_ONSITE, GET_JOB_LIST_REMOTE } from '../src/queries/jobs'
import { LOAD_CLIENT } from '../src/queries/users'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [pagination,setPagination] = useState(1)
  const [filters,setFilters] = useState<FiltersType>({search:"",workplaces: []})
  const [hasFiltersUpdated,setHasFiltersUpdated] = useState(false)

  let query = GET_JOB_LIST

  const {workplaces} = filters
  //Filter query by workplaces. Remote, On-site or Both that is the initial query GET_JOB_LIST.
  if(workplaces.length!==0){
    if(workplaces.length === 1 && workplaces[0] === "remote"){
      query = GET_JOB_LIST_REMOTE
    } else if(workplaces.length === 1 && workplaces[0] === "on-site"){
      query = GET_JOB_LIST_ONSITE
    } else if(workplaces.length === 2){
      query = GET_JOB_LIST
    }
  }

  const {data,loading,error} = useQuery(query,{variables:{limit:10*pagination,searchTitle:filters.search},fetchPolicy:"network-only",notifyOnNetworkStatusChange:true})
  //Retrieved Job Data that came from GraphQL Jobs API
  const jobData = useMemo(()=>data && data.commitments[0].jobs || [],[data])

  let isMobile = false
  if (typeof window !== 'undefined') {
    isMobile = (window  as Window).innerWidth < 768
  }
  //Save active job id to turn it active, displaying the Job Details component and additional styles
  const [activeId,setActiveId] = useState<string | null>(null)
  //State to save the retrieved Jobs list that came from Graphql Jobs API.
  const [jobList, setJobList] = useState<JobType[]>([])

  useEffect(()=>{
    if(data){
      //Save Job list from API
      setJobList(jobData)
      //Reset active Job everytime the list is rerendered and the actual Job showing isnt part of it anymore.
      if(pagination === 1 && jobData.length !==0 && !jobData.some((job:JobType)=>job.id===activeId) && !isMobile){
        setActiveId(jobData[0].id)
      }
    }
  },[pagination,data,jobData,jobList,activeId,isMobile])  

  useEffect(()=>{
    //Reset Pagination when any filter is applied to the list.
    if(hasFiltersUpdated){
      setPagination(1)
      if(!loading){
        setHasFiltersUpdated(false)
      }
    }
  },[hasFiltersUpdated,loading])

  //Show error on fetching Job List
  if(error) return <ApolloErrorMessage error={error}/>

  return (
    <>
      <Head>
        <title>Home - Search Jobs</title>
        <meta name="description" content="Search your dream Job on Find Your Job"/>
      </Head>
      <FilterMenu setFilters={(filtersParams:FiltersType)=>{setFilters(filtersParams);setHasFiltersUpdated(true)}}/>
      
      {loading && <LoadingSpinner/>}
      {!loading && (jobData.length === 0) && <NotFoundMessage message="Found no jobs with that title."/>}

      {(jobList.length > 0) && <div className={styles.container}>
        <JobList list={jobList} 
          activeId={activeId} 
          activeHandler={(activeId:string)=>setActiveId(activeId)}
          loadMoreHandler={()=>{setPagination(state=>state+1)}}
          pagination={pagination}
          loading={loading}
          loadingPlaceholder={hasFiltersUpdated}
        />
        {activeId && <JobDetails 
          data={data && jobList.find((job:JobType)=>job.id===activeId)}
          closeMobileHandler={()=>setActiveId(null)}
          loading={hasFiltersUpdated}
        />}
      </div>}
    </>
  )
}

export async function getStaticProps(){

  //Create initial connection with MySQL and Apollo Client avoiding delay on first real request.
  let data:any;
  await userClient.query({query:LOAD_CLIENT,fetchPolicy:"network-only"})
  .then(response=>data=response)
  .catch((error:ApolloError)=>console.log(error.networkError && JSON.stringify((error.networkError as ServerParseError))))
  console.log(data && data.data.loadClient)

  return {
    props: {}
  }
}

export default Home
