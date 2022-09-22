import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import MainTitle from "../components/contents/MainTitle";
import LoginForm from "../components/forms/LoginForm"
import AuthContext, { AuthContextType } from "../src/stores/authContext";

import styles from "../styles/Home.module.css"

export default function LoginPage(){
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
        <title>Login</title>
        <meta name="description" content="Login into your account on Find Your Job"/>
      </Head>
      <MainTitle title="Login"/>
      <LoginForm/>
      <section className={styles.redirectText}>You do not have an account yet? <Link href="/register"><span className={styles.redirectLink}>Click here to register</span></Link></section>
    </>
  )
}