import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useDispatch } from "react-redux"
import userClient from "../../../config/ApolloClients/UsersClient"
import capitalizeFirstLetters from "../../../helpers/capitalizeFirstLetters"
import { ProfileType } from "../../../helpers/typeDefs"
import useInput from "../../../src/hooks/useInput"
import { UPDATE_USER_PROFILE } from "../../../src/queries/users"
import { actions } from "../../../src/stores/alert-store"
import AuthContext, { AuthContextType } from "../../../src/stores/authContext"
import ImageInput from "../../forms/inputs/ImageInput"
import SingleInput from "../../forms/inputs/SingleInput"
import Backdrop from "../../layout/Backdrop"
import LoadingSpinner from "../../LoadingSpinner"
import styles from "./EditProfileModal.module.css"

type PropsType = {
  profile:ProfileType
  closeModal: ()=>void
}

export default function EditProfileModal({profile,closeModal}:PropsType){
  const [imageFile,setImageFile] = useState<File | null>(null)
  const [loading,setLoading] = useState(false)

  const {displayInfo,token} = useContext(AuthContext) as AuthContextType
  const dispatch = useDispatch()
  const router = useRouter()

  const nameInput = useInput({type:"name",initialValue:profile.name})
  const titleInput = useInput({type:"title",initialValue:profile.jobTitle})
  const locationInput = useInput({type:"location",initialValue:profile.locationName})
  const [bioInput,setBioInput] = useState<string>(profile.bio || "")
  const [bioLength,setBioLength] = useState<number>(profile.bio ? profile.bio.length : 0)

  async function handleSubmit(e:FormEvent){
    e.preventDefault()

    setLoading(true)

    const userData = {
      name: capitalizeFirstLetters(nameInput.value),
      title: capitalizeFirstLetters(titleInput.value),
      location: capitalizeFirstLetters(locationInput.value),
      bio: bioInput,
      profilePicture: displayInfo.profilePicture
    }

    let error = false

    if(imageFile){
      //Convert raw bits to Megabytes to validate uploaded image
      const imageSize = (imageFile!.size / 1024) / 1024

      if(imageSize > 2){
        error = true
        setLoading(false)
        dispatch(actions.createAlert({type:"error",message:"Profile picture can't exceed 2MB limit. Send another one."}))
      } else {
        const request_payload = {type: "update"}
        const formData = new FormData()
        formData.append("image",imageFile)
        formData.append("object",JSON.stringify(request_payload))
  
        const res = await fetch("/api/image/upload",{
          method: "POST",
          body: formData
        }).catch(err=>console.log(err)) as Response

        const {imageUrl} = await res.json()
        userData.profilePicture = imageUrl

        await fetch("/api/image/delete",{
          method: "POST",
          body: JSON.stringify({imageUrl:displayInfo.profilePicture}),
          headers:{
            "Content-Type": "application/json"
          }
        }).catch(err=>console.log(err)) as Response
      }
    }

    if(!error){
      const {data} = await userClient.mutate({mutation:UPDATE_USER_PROFILE,variables:{input:{...userData,token}}})

      const response = data.updateUserProfile
  
      if(!response.error){
        const alert = {type: "success",message:response.message}
        sessionStorage.setItem("alert",JSON.stringify(alert))
        router.reload()
      } else {
        setLoading(false)
        dispatch(actions.createAlert({type:"error",message:response.message}))
      }
    }
  }

  const formIsValid = nameInput.isValid && titleInput.isValid && locationInput.isValid

  return (
    <>
      {loading && <LoadingSpinner/>}
      {loading && <Backdrop transparent zIndex={6}/>}
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}></button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ImageInput initialImage={profile.profilePicture} caption="Change your profile picture" setImageInput={(image:File)=>setImageFile(image)}/>
          <SingleInput disabled={loading} input={nameInput} label="Full Name"/>
          <SingleInput disabled={loading} input={titleInput} label="Title"/>
          <SingleInput disabled={loading} input={locationInput} label="Title"/>
          <div className={styles.formControl} style={{width:"100%"}}>
            <label className={styles.label}>Bio</label>
            <textarea 
              className={styles.textarea} 
              disabled={loading} value={bioInput} maxLength={300}
              onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{setBioInput(e.target.value);setBioLength(e.target.value.length)}}/>
              <span className={styles.charLimit}>Character Limit: {300 - bioLength}</span>
          </div>
          <div className={styles.actionButtons}>
            <button type="button" className={styles.cancelButton} onClick={closeModal}>Cancel</button>
            <button type="submit" disabled={!formIsValid} className={styles.button}>Save</button>
          </div>
        </form>
      </div>
    </>
  )
}