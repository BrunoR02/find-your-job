import { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

export const getStaticPaths:GetStaticPaths = async () =>{

  const idList = await getUsersIds()

  const params = idList.map((item:any)=>{
    return {
      params: {
        userId: item.id
      }
    }
  })

  return {
    paths:[
      ...params
    ],
    fallback: "blocking"
  }
}

export const getStaticProps:GetStaticProps = async ({params}) => {

  let profile: ProfileType | null = null;
  if(params?.userId){
    profile = await getUserProfile(params.userId)
  }

  return {
    props:{
      profile: profile || null
    },
    revalidate: 1,
  }
}

export default ProfilePage