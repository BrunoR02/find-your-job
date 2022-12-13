import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import userClient from "../../config/ApolloClients/UsersClient"
import capitalizeFirstLetters from "../../helpers/capitalizeFirstLetters"
import useInput from "../../src/hooks/useInput" 
import { CHANGE_PROFILE_PICTURE,SIGNUP_USER } from "../../src/queries/users"
import { actions } from "../../src/stores/alert-store"
import LoadingSpinner from "../LoadingSpinner"
import styles from "./Form.module.css"
import ImageInput from "./inputs/ImageInput"
import SingleInput from "./inputs/SingleInput"
import * as bcrypt from "bcryptjs"

export default function SignupForm(){
  const nameInput = useInput({type:"name"})
  const titleInput = useInput({type:"title"})
  const locationInput = useInput({type:"location"})
  const emailInput = useInput({type:"email"})
  const passwordInput = useInput({type:"password"})
  const password2Input = useInput({type:"password"})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    setLoading(true)

    const user = {
      name: capitalizeFirstLetters(nameInput.value),
      jobTitle: capitalizeFirstLetters(titleInput.value),
      locationName: capitalizeFirstLetters(locationInput.value),
      email: emailInput.value,
      password: passwordInput.value,
    }

    //Convert raw bits to Megabytes to validate uploaded image
    const imageSize = (imageFile!.size / 1024) / 1024

    if(imageSize > 2){
      dispatch(actions.createAlert({type:"error",message:"Profile picture can't exceed 2MB limit. Send another one."}))
      setLoading(false)
    } else {
      //Send user data to MySQL database getting back a readable response to the client.
      // const {data} = await userClient.mutate({mutation:SIGNUP_USER,variables:{input:{...user}},fetchPolicy:"network-only"})
      // const response = data.signup
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqlmVQQnarUyNiz7EYMKRRCleq_ZP2tXY",{
        method:"POST",
        body: JSON.stringify({email:user.email,password:user.password,returnSecureToken:true})
      })
      const data = await response.json()

      if(response.status === 200){
        const request_payload = {type: "register"}
        const formData = new FormData()
        formData.append("image",imageFile as File)
        formData.append("object",JSON.stringify(request_payload))

        //Upload image file to AWS S3 storage.
        const resUploadImage = await fetch("/api/image/upload",{
          method: "POST",
          body: formData,
        }).catch(err=>console.log(err.message)) as Response

        const {imageUrl} = await resUploadImage.json()

        const userData = {
          name:user.name,
          locationName:user.locationName,
          jobTitle:user.jobTitle,
          email:user.email,
          profileUrl:imageUrl,
          savedJobs: JSON.stringify([]),
          bio: ""
        }

        const resUserData = await fetch("https://find-your-job-47498-default-rtdb.firebaseio.com/users.json",{
          method:"POST",
          body: JSON.stringify(userData),
          headers:{
            "Content-Type":"application/json"
          }
        })

        if(resUserData.status === 200){
          router.push("/")
          dispatch(actions.createAlert({type:"success",message:"User was registered successfully!"}))
          return
        } else {
          await resUserData.json().then(res=>console.log("Error posting user data to Firebase:",res.error))
        }
      } else if(data.error.message.includes("EMAIL")){
        dispatch(actions.createAlert({type:"error",message:"This email already exists! Try another."}))
      }

      setLoading(false)
      return

      // const alertType = response.error ? "error" : "success"  
      // const alertMessage:string = response.message

      // if(response.error){
      //   dispatch(actions.createAlert({type:alertType,message:alertMessage}))
      // } else {  
      //   const request_payload = {type: "register"}
      //   const blob = new Blob([JSON.stringify(request_payload)],{
      //     type: "application/json"
      //   }) 
      //   const formData = new FormData()
      //   formData.append("image",imageFile as File)
      //   formData.append("object",JSON.stringify(request_payload))

      //   //Upload image file to AWS S3 storage.
      //   const res = await fetch("/api/image/upload",{
      //     method: "POST",
      //     body: formData,
      //   }).catch(err=>console.log(err.message)) as Response

      //   const {imageUrl} = await res.json()

      //   //Use mutation to add created imageUrl from S3 to MySQL Database.
      //   const {data:profile_data} = await userClient.mutate({mutation:CHANGE_PROFILE_PICTURE,variables:{input:{url:imageUrl,email: user.email}},fetchPolicy:"network-only"})
      //   const {error,message} = profile_data.changeProfilePicture

      //   if(error){
      //     console.log(message)
      //   } else {
      //     router.push("/")
      //     dispatch(actions.createAlert({type:"success",message:alertMessage}))
      //   }
      // }
      // setLoading(false)
    }
    
  }

  let errorMatch:string | null = null;
  if(passwordInput.value !== password2Input.value && passwordInput.isValid){
    errorMatch = "Both passwords must be equals"
  }

  let formIsValid = imageFile && nameInput.isValid && titleInput.isValid && locationInput.isValid && emailInput.isValid && passwordInput.isValid && password2Input.isValid && !errorMatch!

  return (
    <>
      {loading && <LoadingSpinner/>}
      <form noValidate className={styles.form} onSubmit={submitHandler}>
        <ImageInput required initialImage="https://find-your-job.s3.sa-east-1.amazonaws.com/icons/guest-profile.png" caption="Upload your profile picture" setImageInput={(image:File)=>setImageFile(image)}/>
        <SingleInput required disabled={loading} input={nameInput} label="Name" placeholder="Insert your full name"/>
        <SingleInput required disabled={loading} input={titleInput} label="Title" placeholder="Insert your job title"/>
        <SingleInput required disabled={loading} input={locationInput} label="Location" placeholder="Insert your location"/>
        <SingleInput required disabled={loading} input={emailInput} label="Email" placeholder="Insert your email"/>
        <SingleInput required disabled={loading} input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
        <SingleInput required disabled={loading} input={password2Input} label="Confirm Password" type="password" placeholder="Confirm your password" 
        extraErrorMessage={errorMatch!} isConfirmation/>
        <button disabled={!formIsValid} className={styles.button}>Sign up</button>
      </form>
    </>
  )
}