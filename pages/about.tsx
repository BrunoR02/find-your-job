import Head from "next/head";
import AboutContent from "../components/contents/AboutContent";
import MainTitle from "../components/contents/MainTitle";

export default function about(){
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Page about Find your Job main funcionalities"/>
      </Head>
      <MainTitle title="About"/>
      <AboutContent/>
    </>
  )
}