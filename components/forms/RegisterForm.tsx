import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import userClient from "../../config/ApolloClients/UsersClient"
import capitalizeFirstLetters from "../../helpers/capitalizeFirstLetters"
import useInput from "../../src/hooks/useInput" 
import { CHANGE_PROFILE_PICTURE, REGISTER_USER } from "../../src/queries/users"
import { actions } from "../../src/stores/alert-store"
import LoadingSpinner from "../LoadingSpinner"
import styles from "./Form.module.css"
import ImageInput from "./inputs/ImageInput"
import SingleInput from "./inputs/SingleInput"

export default function RegisterForm(){
  const nameInput = useInput("name")
  const titleInput = useInput("title")
  const locationInput = useInput("location")
  const emailInput = useInput("email")
  const passwordInput = useInput("password")
  const password2Input = useInput("password")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    setLoading(true)

    const user = {
      name: capitalizeFirstLetters(nameInput.value),
      title: capitalizeFirstLetters(titleInput.value),
      location: capitalizeFirstLetters(locationInput.value),
      email: emailInput.value,
      password: passwordInput.value,
    }

    //Convert raw bits to Megabytes to validate uploaded image
    const imageSize = (imageFile!.size / 1024) / 1024

    if(imageSize > 4){
      dispatch(actions.createAlert({type:"error",message:"Profile picture can't exceed 4MB limit. Send another one."}))
      setLoading(false)
    } else {
      //Send user data to MySQL database getting back a readable response to the client.
      const {data} = await userClient.mutate({mutation:REGISTER_USER,variables:{input:{...user}}})
      const response = data.register
  
      const alertType = response.error ? "error" : "success"
      const alertMessage:string = response.message

      if(response.error){
        dispatch(actions.createAlert({type:alertType,message:alertMessage}))
      } else {  
        
        const formData = new FormData()
        formData.append("image",imageFile as File)

        //Upload image file to AWS S3 storage.
        const res = await fetch("/api/upload",{
          method: "POST",
          body: formData,
        }).catch(err=>console.log(err.message)) as Response

        const data = await res.json()

        //Use mutation to add created imageUrl from S3 to MySQL Database.
        const {data:profile_data} = await userClient.mutate({mutation:CHANGE_PROFILE_PICTURE,variables:{input:{url:data.imageUrl,email: user.email}}})
        const {error,message} = profile_data.changeProfilePicture

        if(error){
          console.log(message)
        } else {
          router.push("/")
          dispatch(actions.createAlert({type:"success",message:alertMessage}))
        }
      }
      setLoading(false)
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
        <ImageInput required setImageInput={(image:File)=>setImageFile(image)}/>
        <SingleInput required input={nameInput} label="Name" placeholder="Insert your full name"/>
        <SingleInput required input={titleInput} label="Title" placeholder="Insert your job title"/>
        <SingleInput required input={locationInput} label="Location" placeholder="Insert your location"/>
        <SingleInput required input={emailInput} label="Email" placeholder="Insert your email"/>
        <SingleInput required input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
        <SingleInput required input={password2Input} label="Confirm Password" type="password" placeholder="Confirm your password" 
        extraErrorMessage={errorMatch!} isConfirmation/>
        <button disabled={!formIsValid} className={styles.button}>Register</button>
      </form>
    </>
  )
}