import { ChangeEvent } from "react";
import styles from "./Form.module.css"

type InputType ={
  value: string
  errorMsg: string | null
  isValid: boolean
  isInvalid: boolean
  wasTouched: boolean
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  blurHandler: () => void
  resetInput: () => void
}

type PropsType = {
  input: InputType
  label: string
  type?: string
  extraErrorMessage?: string | null
  placeholder: string
  isConfirmation?: boolean
}

export default function SingleInput({input,label,type = "text",extraErrorMessage = null, placeholder, isConfirmation}:PropsType){

  let invalid:boolean = !!extraErrorMessage || input.isInvalid

  if(isConfirmation){
    invalid = !!(extraErrorMessage || input.value.length < 7) && input.wasTouched
  }

  return (
    <div className={styles.formControl}>
      <label className={styles.label + " " + (invalid && styles.error)}>{label}
        <input placeholder={placeholder}
        className={styles.input + " " + (invalid && styles.errorInput)}
        type={type}
        value={input.value}
        onChange={input.changeHandler}
        onBlur={input.blurHandler}/>
      </label>
      {invalid && <span className={styles.errorMessage}>{extraErrorMessage}</span>}
      {invalid && !isConfirmation && <span className={styles.errorMessage}>{extraErrorMessage ? extraErrorMessage : input.errorMsg}</span>}
    </div>
  )
}