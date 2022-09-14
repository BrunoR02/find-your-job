import Head from "next/head";
import Link from "next/link";
import MainTitle from "../components/contents/MainTitle";
import LoginForm from "../components/forms/LoginForm"

import styles from "../styles/Home.module.css"

export default function LoginPage(){
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login into your account on Find Your Job"/>
      </Head>
      <MainTitle title="Login"/>
      <LoginForm/>
      <section className={styles.redirectText}>You don't have an account yet? <Link href="/register"><span className={styles.redirectLink}>Click here to register</span></Link></section>
    </>
  )
}