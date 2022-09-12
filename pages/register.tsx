import Head from "next/head";
import PageTitle from "../components/contents/PageTitle";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage(){
  return (
    <>
      <Head>
        <title>Register your account</title>
        <meta name="description" content="Register You Account on Find Your Job"/>
      </Head>
      <PageTitle title="Register your account"/>
      <RegisterForm/>
    </>
  )
}