import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { actions } from "../../src/stores/alert-store"
import AuthContext, { AuthContextType } from "../../src/stores/authContext"
import FavoriteContext, { FavoriteContextType } from "../../src/stores/FavoriteContext"
import LoadingSpinner from "../LoadingSpinner"
import styles from "./SaveButton.module.css"

type PropsType = {
  jobId: string
  closeDetails: ()=>void
}

export default function SaveButton({jobId,closeDetails}:PropsType){
  const {favorites,isLoading,addFavorite,removeFavorite} = useContext(FavoriteContext) as FavoriteContextType
  const {isLogged,token} = useContext(AuthContext) as AuthContextType

  const [saved,setSaved] = useState<boolean>(favorites.some(favId=>favId===jobId))

  const router = useRouter()
  const dispatch = useDispatch()

  const isAlreadySaved = favorites.some(favId=>favId===jobId)

  useEffect(()=>{
    setSaved(isAlreadySaved)
  },[jobId,isAlreadySaved])

  async function saveHandler(){
    if(isLogged){
      if(!saved){
        addFavorite(jobId,token as string)
      } else {
        removeFavorite(jobId,token as string)
        closeDetails()
      }
      if(!isLoading) setSaved(state=>!state)
    } else {
      dispatch(actions.createAlert({type:"warning",message:"Log in first to be able to save jobs."}))
      router.push("login")
    }
  }
  return (
    <>
      {isLoading && <LoadingSpinner/>}
      <button onClick={saveHandler} className={styles.saveButton + " " + (saved && styles.saveActive)}>{!saved ? "Save" : "Saved"}</button>
    </>
  )
}