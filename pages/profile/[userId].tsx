import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import ProfileBottom from "../../components/profile/ProfileBottom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { getUserProfile, getUsersIds } from "../../config/db";
import { ProfileType } from "../../helpers/typeDefs";
import { actions } from "../../src/stores/alert-store";

const ProfilePage:NextPage<{profile:ProfileType}> = ({profile})=>{
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!profile){
      router.push("/")
      dispatch(actions.createAlert({type:"error",message:"This profile does not exists."}))
    }
  },[profile,router,dispatch])

  const profileTitle = "Profile - " + (profile ? profile.name : "")

  return (
    <>
      <Head>
        <title>{profileTitle}</title>
        <meta name="description" content="Profile on Find Your Job"/>
      </Head>
      {profile && <>
        <ProfileHeader profile={profile}/>
        <ProfileBottom profile={profile}/>
      </>}
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async (context)=>{

  let profile: ProfileType | null = null;
  if(context.params?.userId){
    profile = await getUserProfile(context.params.userId)
  }
  return {
    props:{
      profile: profile || null
    }
  }
}

export default ProfilePage