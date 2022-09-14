import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { actions } from "../../src/stores/alert-store"
import AuthContext from "../../src/stores/authContext"
import FavoriteContext from "../../src/stores/FavoriteContext"
import styles from "./SaveButton.module.css"

type PropsType = {
  jobId: string
  isAlreadySaved: boolean
}

export default function SaveButton({jobId,isAlreadySaved}:PropsType){
  const {addFavorite,removeFavorite} = useContext(FavoriteContext)
  const {isLogged} = useContext(AuthContext)

  const [saved,setSaved] = useState<boolean>(isAlreadySaved)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(()=>{
    setSaved(isAlreadySaved)
  },[isAlreadySaved])

  function saveHandler(){
    if(isLogged){
      setSaved(state=>!state)
      if(!saved){
        addFavorite(jobId)
      } else {
        removeFavorite(jobId)
      }
    } else {
      dispatch(actions.createAlert({type:"warning",message:"Log in first to be able to save jobs."}))
      router.push("login")
    }
  }

  return (
    <button onClick={saveHandler} className={styles.saveButton + " " + (saved && styles.saveActive)}>{!saved ? "Save" : "Saved"}</button>
  )
}