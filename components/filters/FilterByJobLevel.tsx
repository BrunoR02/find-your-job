import { useState } from "react"
import Backdrop from "../layout/Backdrop"
import styles from "./FilterByJobLevel.module.css"

type PropsType = {
  setJobLevels: (levels:string[])=>void
}

export default function FilterByJobLevel({setJobLevels}:PropsType){
  const [activeJobLevels,setActiveJobLevels] = useState<string[]>([])
  const [filterLabel,setFilterLabel] = useState("Job Level")
  const [showOptions,setShowOptions] = useState(false)

  const levelOptions = ["Entry Level","Junior Level","Mid Level","Senior Level"]
  
  return (
    <div className={styles.container}>
      <button className={styles.showButton + " " + (showOptions && styles.showButtonActive)} onClick={()=>setShowOptions(state=>!state)}>{filterLabel}</button>

      {showOptions && <Backdrop onClickHandler={()=>setShowOptions(false)}/>}

      {showOptions && <ul className={styles.modal}>
        <button className={styles.closeButton} onClick={()=>{setShowOptions(false)}}></button>
        {levelOptions.map(level=>{
          return (
          <li key={level} className={styles.item}>
            <label className={styles.label}>
              <input className={styles.checkbox} type="checkbox" value={level} checked={activeJobLevels.some(value=>value===level)} onChange={(e)=>{
                  //If box is checked add to company List
                  if(e.target.checked){
                    setActiveJobLevels(list=>[...list,e.target.value])
                  //If is already on the list, remove from it.
                  } else {
                    setActiveJobLevels(list=>list.filter(value=>value!==e.target.value))
                  }
                }}/>
                {level}
            </label>
          </li>)
        })}
        <div className={styles.actions}>
          <button className={styles.resultsButton} onClick={()=>{setShowOptions(false);setActiveJobLevels([]);setJobLevels([]);setFilterLabel("Job Level")}}>Clear</button>
          <button className={styles.resultsButton} onClick={()=>{setShowOptions(false);setJobLevels(activeJobLevels);setFilterLabel(activeJobLevels.length===0 ?"Job Level":(activeJobLevels.length>1?activeJobLevels[0]+", ...": activeJobLevels[0]))}}>Show Results</button>
        </div>
      </ul>}

    </div>
  )
}