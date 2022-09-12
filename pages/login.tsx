import Head from "next/head";
import MainTitle from "../components/contents/MainTitle";
import LoginForm from "../components/forms/LoginForm"

export default function LoginPage(){
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login into your account on Find Your Job"/>
      </Head>
      <MainTitle title="Login"/>
      <LoginForm/>
    </>
  )
}