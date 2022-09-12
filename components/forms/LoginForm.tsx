import { FormEvent} from "react"
import useInput from "../../src/hooks/useInput"
import styles from "./Form.module.css"
import SingleInput from "./inputs/SingleInput"

export default function RegisterForm(){
  const emailInput = useInput("email", "login")
  const passwordInput = useInput("password","login")

  function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const user = {
      email: emailInput.value,
      password: passwordInput.value
    }
    console.log(user)
  }

  let formIsValid = emailInput.isValid && passwordInput.isValid

  return (
    <form noValidate className={styles.form} onSubmit={submitHandler}>
      <SingleInput input={emailInput} label="Email" placeholder="Insert your email"/>
      <SingleInput input={passwordInput} label="Password" type="password" placeholder="Insert your password"/>
      <button disabled={!formIsValid} className={styles.button}>Login</button>
    </form>
  )
}