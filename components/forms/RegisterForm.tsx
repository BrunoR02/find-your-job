import { FormEvent, useState } from "react"
import userClient from "../../config/UsersClient"
import useInput from "../../src/hooks/useInput"
import { REGISTER_USER } from "../../src/queries/users"
import styles from "./Form.module.css"
import SingleInput from "./inputs/SingleInput"

export default function RegisterForm(){
  const nameInput = useInput("name")
  const emailInput = useInput("email")
  const passwordInput = useInput("password")
  const password2Input = useInput("password")

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }

    let data;
    await userClient.mutate({mutation:REGISTER_USER,variables:{input:{...user}}}).then(response=>data=response).catch((error)=>{console.log(error)})
    
    console.log(data)
  }

  let errorMatch:string | null = null;

  if(passwordInput.value !== password2Input.value && passwordInput.isValid){
    errorMatch = "Both passwords must be equals"
  }

  let formIsValid = nameInput.isValid && emailInput.isValid && passwordInput.isValid && password2Input.isValid && !errorMatch!

  return (
    <form noValidate className={styles.form} onSubmit={submitHandler}>
      <SingleInput required input={nameInput} label="Name" placeholder="Insert your full name"/>
      <SingleInput required input={emailInput} label="Email" placeholder="Insert your email"/>
      <SingleInput required input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
      <SingleInput required input={password2Input} label="Confirm Password" type="password" placeholder="Confirm your password" 
      extraErrorMessage={errorMatch!} isConfirmation/>
      <button disabled={!formIsValid} className={styles.button}>Register</button>
    </form>
  )
}