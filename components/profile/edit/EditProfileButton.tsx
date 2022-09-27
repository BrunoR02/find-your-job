import { useState } from "react"
import { ProfileType } from "../../../helpers/typeDefs"
import Backdrop from "../../layout/Backdrop"
import styles from "./EditProfileButton.module.css"
import EditProfileModal from "./EditProfileModal"

export default function EditProfileButton({profile}:{profile:ProfileType}){
  const [showModal,setShowModal] = useState(false)

  return (
    <>
      {showModal && <EditProfileModal closeModal={()=>setShowModal(false)} profile={profile}/>}
      {showModal && <Backdrop onClickHandler={()=>setShowModal(false)}/>}
      <button className={styles.button} onClick={()=>setShowModal(true)}>Edit Profile</button>
    </>
  )
}