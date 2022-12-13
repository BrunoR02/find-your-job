import Image from "next/image";
import { useEffect, useState } from "react";
import { ProfileType } from "../../helpers/typeDefs";
import LoadingSpinner from "../LoadingSpinner";

import styles from "./ProfileHeader.module.css"

type PropsType = {
  profile: ProfileType
}

export default function ProfileHeader({profile}:PropsType){

  const [picture,setPicture] = useState({
    //If already logged in, it wont load the image beforehand
    loaded: false, 
    url: "https://find-your-job.s3.sa-east-1.amazonaws.com/icons/guest-profile.png"
  })
  const [loading,setLoading] = useState(!picture.loaded)

  const url = picture.url

  useEffect(()=>{
    if(profile.profilePicture!==url){
      setPicture(state=>({...state,loaded:false}))
    }
  },[url,profile])

  return (
    <>
      {loading && <LoadingSpinner/>}
      <div className={styles.background}>
        <section className={styles.container}>
          <div className={styles.picture}><Image priority src={picture.url} alt="profile-picture" width="100%" height="100%" layout="responsive"/></div>
          <div className={styles.info}>
            <h3 className={styles.name}>{profile.name}</h3>
            <h5 className={styles.title}>{profile.jobTitle}</h5>
            <span className={styles.location}>{profile.locationName}</span>
          </div>
        </section>
        {!picture.loaded && <div className={styles.loadPicture}>
          <Image 
            onLoad={()=>{setPicture({loaded: true, url:profile.profilePicture});setLoading(false)}} 
            src={profile.profilePicture} 
            alt="load-picture" 
            width="100%" 
            height="100%"/>
          </div>
        }
      </div>
    </>
  )
}