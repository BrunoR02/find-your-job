import { useState } from "react";
import Backdrop from "../layout/Backdrop";
import styles from "./FilterByWorkplace.module.css"

export default function FilterByWorkplace({setWorkplaces}:{setWorkplaces:(list:string[])=>void}){
  const [activeList,setActiveList] = useState<string[]>([])
  const [showOptions,setShowOptions] = useState(false)
  
  const workplaceOptions = ["remote","on-site"]

  return (
    <div className={styles.container}>
      <button className={styles.showButton} onClick={()=>setShowOptions(state=>!state)}>On-site/Remote</button>

      {showOptions && <Backdrop onClickHandler={()=>setShowOptions(false)}/>}

      {showOptions && <ul className={styles.modal}>
        <button className={styles.closeButton} onClick={()=>{setShowOptions(false)}}></button>
        {workplaceOptions.map(workplace=>{
          return (
          <li key={workplace} className={styles.item}>
            <label>
              <input className={styles.checkbox} type="checkbox" value={workplace} checked={activeList.some(value=>value===workplace)} onChange={(e)=>{
                //If box is checked add to company List
                if(e.target.checked){
                  setActiveList(list=>[...list,e.target.value])
                //If is already on the list, remove from it.
                } else {
                  setActiveList(list=>list.filter(value=>value!==e.target.value))
                }
              }}/>
              {workplace.charAt(0).toUpperCase() + workplace.slice(1)}
            </label>
          </li>)
        })}
        <button className={styles.resultsButton} onClick={()=>{setShowOptions(false);setWorkplaces(activeList)}}>Show Results</button>
      </ul>}
    </div>
    
  )
}