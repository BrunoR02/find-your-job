import SearchFilter from "./SearchFilter";
import styles from "./FilterMenu.module.css"
import { useEffect, useState } from "react";
import { FiltersType } from "../../helpers/typeDefs";
import FilterByWorkplace from "./FilterByWorkplace";

export default function FilterMenu({setFilters}:{setFilters:(filterParams:FiltersType)=>void}){
  const [hasChanged,setHasChanged] = useState(false)
  const [filterParams,setFilterParams] = useState<FiltersType>({search: "",workplaces: []})

  useEffect(()=>{
    if(hasChanged){
      setFilters(filterParams)
      setHasChanged(false)
    }
  },[filterParams])

  return (
    <div className={styles.menu}>
      <SearchFilter Search={(value:string)=>{setFilterParams(state=>({...state,search:value}));setHasChanged(true)}}/>
      <FilterByWorkplace setWorkplaces={(list:string[])=>{setFilterParams(state=>({...state,workplaces:list}));setHasChanged(true)}}/>
    </div>
  )
}