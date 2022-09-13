import { FormEvent} from "react"
import userClient from "../../config/UsersClient"
import useInput from "../../src/hooks/useInput"
import { LOGIN_USER } from "../../src/queries/users"
import styles from "./Form.module.css"
import SingleInput from "./inputs/SingleInput"

export default function RegisterForm(){
  const emailInput = useInput("email", "login")
  const passwordInput = useInput("password","login")

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const user = {
      email: emailInput.value,
      password: passwordInput.value
    }

    const {data,errors} = await userClient.mutate({mutation:LOGIN_USER,variables:{input:{...user}}})
    
    console.log(data)

    console.log(errors)
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