import type { NextPage } from 'next'
import JobList from '../components/jobs/JobList'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <JobList/>
    </div>
  )
}

export default Home
