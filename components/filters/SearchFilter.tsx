import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
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
      let splitWords = value.split(" ")
      
      for(let i=0;i<splitWords.length;i++){
        splitWords[i] = splitWords[i].charAt(0).toUpperCase() + splitWords[i].slice(1)
      }

      let formatedValue = splitWords.join(" ")

      Search(formatedValue)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input className={styles.input} type="text" name="title" placeholder="Search by Job Title" ref={titleRef}/>
      <button className={styles.button}><Image width="30px" height="30px" alt="Search Icon" className={styles.searchIcon} src="https://cdn-icons-png.flaticon.com/512/54/54481.png"></Image></button>
    </form>
  )
}