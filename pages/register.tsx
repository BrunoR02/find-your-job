import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import MainTitle from "../components/contents/MainTitle";
import RegisterForm from "../components/forms/RegisterForm";
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
        <title>Register your account</title>
        <meta name="description" content="Register You Account on Find Your Job"/>
      </Head>
      <MainTitle title="Register your account"/>
      <RegisterForm/>
      <section className={styles.redirectText}>Already have an account? <Link href="/login"><span className={styles.redirectLink}>Click here to login</span></Link></section>
    </>
  )
}