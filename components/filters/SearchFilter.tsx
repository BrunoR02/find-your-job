import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import capitalizeFirstLetters from "../../helpers/capitalizeFirstLetters"
import styles from "./SearchFilter.module.css"

export default function SearchFilter({Search}:{Search:(value:string)=>void}){
  const [lastValue,setLastValue] = useState<string | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  function submitHandler(e:FormEvent){
    e.preventDefault()

    let value = titleRef.current!.value.trim()

    if(value !== lastValue){
      setLastValue(value)
      //Put Capital on each word, because is how all the job Titles look like.
      const formatedValue = capitalizeFirstLetters(value)

      Search(formatedValue)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input className={styles.input} type="text" name="title" placeholder="Search by Job Title" ref={titleRef}/>
      <button className={styles.button}><Image width="30px" height="30px" alt="Search Icon" className={styles.searchIcon} src="https://find-your-job.s3.sa-east-1.amazonaws.com/icons/search.png"></Image></button>
    </form>
  )
}