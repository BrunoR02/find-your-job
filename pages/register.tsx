import Head from "next/head";
import Link from "next/link";
import MainTitle from "../components/contents/MainTitle";
import RegisterForm from "../components/forms/RegisterForm";

import styles from "../styles/Home.module.css"

export default function RegisterPage(){
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