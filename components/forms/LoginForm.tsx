import { FormEvent, useContext, useState} from "react"
import { useDispatch } from "react-redux"
import userClient from "../../config/ApolloClients/UsersClient"
import useInput from "../../src/hooks/useInput"
import { LOGIN_USER } from "../../src/queries/users"
import { actions } from "../../src/stores/alert-store"
import AuthContext, { AuthContextType } from "../../src/stores/authContext"
import FavoriteContext, { FavoriteContextType } from "../../src/stores/FavoriteContext"
import LoadingSpinner from "../LoadingSpinner"
import styles from "./Form.module.css"
import SingleInput from "./inputs/SingleInput"

export default function RegisterForm(){
  const emailInput = useInput({type:"email", form:"login"})
  const passwordInput = useInput({type:"password",form:"login"})
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()
  
  const {login} = useContext(AuthContext) as AuthContextType
  const {retrieveFavorites} = useContext(FavoriteContext) as FavoriteContextType

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    setLoading(true)

    const user = {
      email: emailInput.value,
      password: passwordInput.value
    }

    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqlmVQQnarUyNiz7EYMKRRCleq_ZP2tXY",{
      method:"POST",
      body:JSON.stringify({...user,returnSecureToken:true})
    })

    const resData = await res.json()

    if(res.status === 200){
      const expirationTime = new Date(new Date().getTime() + (+resData.expiresIn * 1000)).getTime().toString()
      login(resData.idToken,expirationTime)
      retrieveFavorites(resData.idToken)
      dispatch(actions.createAlert({type:"success",message:"Logged in!"}))
    } else if(resData.error.message.includes("EMAIL")){
      dispatch(actions.createAlert({type:"error",message:"Email is not registered yet. Register it first."}))
    } else if(resData.error.message.includes("PASSWORD")){
      dispatch(actions.createAlert({type:"error",message:"Incorrect password. Try again."}))
    }
    setLoading(false)

    return

    // const {data,errors} = await userClient.mutate({mutation:LOGIN_USER,variables:{input:{...user}}})

    // const {response,token} = data.login

    // //Send the right
    // const alertType = response.error ? "error" : "success"
    // const alertMessage:string = response.message

    // if(!response.error){
    //   login(token)
    //   retrieveFavorites(token)
    // }
    // setLoading(false)
    
    // dispatch(actions.createAlert({type:alertType,message:alertMessage}))
  }

  let formIsValid = emailInput.isValid && passwordInput.isValid

  return (
    <>
      {loading && <LoadingSpinner/>}
      <form noValidate className={styles.form} onSubmit={submitHandler}>
        <SingleInput disabled={loading} input={emailInput} label="Email" placeholder="Insert your email"/>
        <SingleInput disabled={loading} input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
        <button disabled={!formIsValid} className={styles.button}>Login</button>
      </form>
    </>
  )
}