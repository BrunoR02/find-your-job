import type { NextPage } from 'next'
import { useState } from 'react'
import JobDetails from '../components/jobs/JobDetails'
import JobList from '../components/jobs/JobList'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [activeJob,setActiveJob] = useState(0)

  return (
    <div className={styles.container}>
      <JobList activeJob={activeJob} activeHandler={(activeId)=>setActiveJob(activeId)}/>
      {!!activeJob && <JobDetails closeMobileHandler={()=>setActiveJob(0)}/>}
    </div>
  )
}

export default Home
