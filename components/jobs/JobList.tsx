import JobCard from "./JobCard";
import styles from "./JobList.module.css"
import jobCardStyles from "./JobCard.module.css"
import { NewJobType } from "../../helpers/typeDefs";
import JobCardPlaceholder from "../layout/LoaderPlaceholder/JobCardPlaceholder";
import { useEffect, useState } from "react";

type PropsType = {
  list: NewJobType[],
  activeId: string | null,
  activeHandler: (activeId:string) => void,
  loadMoreHandler?: ()=>void,
  pagination?: number,
  loading?: boolean,
  loadingPlaceholder?: boolean,
}

export default function JobList({list,activeId,activeHandler,loadMoreHandler,pagination,loading,loadingPlaceholder}:PropsType){
  const [oldList,setOldList] = useState(list.map(job=>job.id))

  //Make placeholder smooth changing the size depending on the length of list
  useEffect(()=>{
    if(list.length !== oldList.length){
      setOldList(list.map(job=>job.id))
    }
  },[list,oldList])

  const showLoadMore = !!pagination && list.length >= 10 * pagination

  return (
    <ul className={styles.list}>
      {loadingPlaceholder && oldList.map(item=>
        <JobCardPlaceholder key={item}/>
        )}
      {!loadingPlaceholder && list.map((job:NewJobType)=>{
        return <JobCard key={job.id} data={job} activeHandler={()=>activeHandler(job.id)} addClass={activeId===job.id ?jobCardStyles.active: ""}/>
      })}
      {(list.length >= 10) && !showLoadMore && loading && <button className={styles.loadMore}>Loading...</button>}
      {showLoadMore && <button onClick={loadMoreHandler} className={styles.loadMore}>Load More</button>}
    </ul>
  )
}