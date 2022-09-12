import Head from "next/head";
import MainTitle from "../components/contents/MainTitle";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage(){
  return (
    <>
      <Head>
        <title>Register your account</title>
        <meta name="description" content="Register You Account on Find Your Job"/>
      </Head>
      <MainTitle title="Register your account"/>
      <RegisterForm/>
    </>
  )
}