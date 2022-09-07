import JobCard from "./JobCard";
import styles from "./JobList.module.css"
import jobCardStyles from "./JobCard.module.css"
import { Job } from "../../helpers/typeDefs";

type PropsType = {
  list: Job[],
  activeId: string | null,
  activeHandler: (activeId:string) => void,
  loadMoreHandler?: ()=>void,
  pagination?: number,
  loading?: boolean,
}

export default function JobList({list,activeId,activeHandler,loadMoreHandler,pagination,loading}:PropsType){

  const showLoadMore = !!pagination && list.length >= 10 * pagination

  return (
    <ul className={styles.list}>
      {list.map((job:Job)=>{
        return <JobCard key={job.id} data={job} activeHandler={()=>activeHandler(job.id)} addClass={activeId===job.id ?jobCardStyles.active: ""}/>
      })}
      {(list.length !==0) && !showLoadMore && loading && <button className={styles.loadMore}>Loading...</button>}
      {showLoadMore && <button onClick={loadMoreHandler} className={styles.loadMore}>Load More</button>}
    </ul>
  )
}