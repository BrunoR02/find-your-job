import { useState } from "react"
import Backdrop from "../layout/Backdrop"
import styles from "./FilterByDatePosted.module.css"

type PropsType = {
  setDatePosted:(day:number)=>void
}

export function FilterByDataPosted({setDatePosted}:PropsType){
  const [activeDate,setActiveDate] = useState(0)
  const [showOptions,setShowOptions] = useState(false)

  const dateOptions = [
    {label:"Past Day",value:1},
    {label:"Past 3 Days",value:3},
    {label:"Past Week",value:7},
    {label:"Past Month",value:30}
  ]

  return (
    <div className={styles.container}>
      <button className={styles.showButton} onClick={()=>setShowOptions(state=>!state)}>Data Posted</button>

      {showOptions && <Backdrop onClickHandler={()=>setShowOptions(false)}/>}

      {showOptions && <ul className={styles.modal}>
        <button className={styles.closeButton} onClick={()=>{setShowOptions(false)}}></button>
        {dateOptions.map(date=>{
          return (
          <li key={date.value} className={styles.item}>
            <label className={styles.label}>
              <input className={styles.checkbox} type="radio" value={date.value} checked={activeDate===date.value} onChange={(e)=>{
                setActiveDate(date.value)
                // //If box is checked add to company List
                // if(e.target.checked){
                //   setActiveDate()
                // //If is already on the list, remove from it.
                // } else {
                //   setActiveDate(list=>list.filter(value=>value!==e.target.value))
                // }
              }}/>
              <span className={styles.checkmark}></span>
              {date.label}
            </label>
          </li>)
        })}
        <div className={styles.actions}>
          <button className={styles.resultsButton} onClick={()=>{setShowOptions(false);setActiveDate(0);setDatePosted(0)}}>Clear</button>
          <button className={styles.resultsButton} onClick={()=>{setShowOptions(false);setDatePosted(activeDate)}}>Show Results</button>
        </div>
      </ul>}

    </div>
  )
}