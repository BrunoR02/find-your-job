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
      <FilterByWorkplace setWorkplaces={(list:string[])=>{setFilterParams(state=>{
        //Compare if the workplace list has really changed to refetch again, if not, it 
        //doesnt refetch at all, avoiding doing it unnecessarily.
        let isEqual:boolean = true;

        if(list.length !== 0){
          for(let i=0;i<list.length;i++){
            isEqual = isEqual && filterParams.workplaces.some(item=>item===list[i])
          }
        }
        if(!isEqual || filterParams.workplaces.length > list.length) {setHasChanged(true)}
        
        return {...state,workplaces:list}
      })}}/>
    </div>
  )
}