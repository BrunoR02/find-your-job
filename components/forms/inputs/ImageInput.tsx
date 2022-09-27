import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./ImageInput.module.css"

type PropsType = {
  initialImage: string
  caption: string
  setImageInput: (image:File)=>void
  required?: boolean
}

export default function ImageInput({initialImage,caption,setImageInput,required}:PropsType){
  const [profileImage,setProfileImage] = useState<string>(initialImage)

  function changeHandler(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files![0]){
      setProfileImage(URL.createObjectURL(e.target.files![0]))
      setImageInput(e.target.files![0])
    }
  }

  return (
    <div className={styles.formControl}>
      <Image className={styles.image} priority src={profileImage} alt="profile-picture" layout="fixed" width="100%" height="100%"/>
      <label className={styles.input}> {caption} <span className={styles.required}>{required && "*"}</span>
        <input style={{display:"none"}} accept="image/*" type="file" name="image" onChange={changeHandler}/>
      </label>
    </div>
  )
}