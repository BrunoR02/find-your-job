import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import MainTitle from "../components/contents/MainTitle";
import SignupForm from "../components/forms/SignupForm";
import AuthContext, { AuthContextType } from "../src/stores/authContext";

import styles from "../styles/Home.module.css"

export default function RegisterPage(){
  const router = useRouter()

  const {isLogged} = useContext(AuthContext) as AuthContextType

  //Check if user has permission to see the page.
  useEffect(()=>{
    if(isLogged){
      router.push("/")
    }
  },[isLogged,router])

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up for you account on Find Your Job"/>
      </Head>
      <MainTitle title="Create your account"/>
      <SignupForm/>
      <section className={styles.redirectText}>Already have an account? <Link href="/login"><span className={styles.redirectLink}>Click here to login</span></Link></section>
    </>
  )
}