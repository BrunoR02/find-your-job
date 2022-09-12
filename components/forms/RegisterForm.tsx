import { FormEvent, useState } from "react"
import useInput from "../../src/hooks/useInput"
import styles from "./Form.module.css"
import SingleInput from "./SingleInput"

export default function RegisterForm(){
  const nameInput = useInput("name")
  const emailInput = useInput("email")
  const passwordInput = useInput("password")
  const password2Input = useInput("password")

  function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }
    console.log(user)
  }

  let errorMatch:string | null = null;

  if(passwordInput.value !== password2Input.value && passwordInput.isValid){
    errorMatch = "Both passwords must be equals"
  }

  let formIsValid = nameInput.isValid && emailInput.isValid && passwordInput.isValid && password2Input.isValid && !errorMatch!

  return (
    <form noValidate className={styles.form} onSubmit={submitHandler}>
      <SingleInput input={nameInput} label="Name" placeholder="Insert your full name"/>
      <SingleInput input={emailInput} label="Email" placeholder="xxx@xx.xx"/>
      <SingleInput input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
      <SingleInput input={password2Input} label="Confirm Password" type="password" placeholder="Confirm your password" 
      extraErrorMessage={errorMatch!} isConfirmation/>
      <button disabled={!formIsValid} className={styles.button}>Register</button>
    </form>
  )
}