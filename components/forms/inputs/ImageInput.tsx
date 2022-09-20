import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./ImageInput.module.css"

type PropsType = {
  setImageInput: (image:File)=>void
  required?: boolean
}

export default function ImageInput({setImageInput,required}:PropsType){
  const [profileImage,setProfileImage] = useState<string>("https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/guest-profile.png")

  function changeHandler(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files![0]){
      setProfileImage(URL.createObjectURL(e.target.files![0]))
      setImageInput(e.target.files![0])
    }
  }

  return (
    <div className={styles.formControl}>
      <Image className={styles.image} priority src={profileImage} layout="fixed" width="100%" height="100%"/>
      <label className={styles.input}> Upload your profile picture <span className={styles.required}>{required && "*"}</span>
        <input style={{display:"none"}} type="file" name="image" onChange={changeHandler}/>
      </label>
    </div>
  )
}