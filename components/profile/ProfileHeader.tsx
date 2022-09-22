import Image from "next/image";
import { useState } from "react";
import { ProfileType } from "../../helpers/typeDefs";
import LoadingSpinner from "../LoadingSpinner";

import styles from "./ProfileHeader.module.css"

type PropsType = {
  profile: ProfileType
}

export default function ProfileHeader({profile}:PropsType){
  const [picture,setPicture] = useState({loaded: false, url:"https://find-your-job-files.s3.sa-east-1.amazonaws.com/icons/guest-profile.png"})
  const [loading,setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingSpinner/>}
      <div className={styles.background}>
        <section className={styles.container}>
          <Image className={styles.picture} src={picture.url} width="300px" height="300px"/>
          <div className={styles.info}>
            <h3 className={styles.name}>{profile.name}</h3>
            <h5 className={styles.title}>{profile.jobTitle}</h5>
            <span className={styles.location}>{profile.locationName}</span>
          </div>
        </section>
        {!picture.loaded && <div className={styles.loadPicture}><Image onLoad={()=>{setPicture({loaded: true, url:profile.profilePicture});setLoading(false)}} src={profile.profilePicture} width="100%" height="100%"/></div>}
      </div>
    </>
  )
}