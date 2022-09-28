import { ChangeEvent } from "react";
import styles from "./SingleInput.module.css"

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
  placeholder?: string
  isConfirmation?: boolean
  required?: boolean
  disabled?: boolean
  extraStyle?: React.CSSProperties
}

export default function SingleInput({input,label,type = "text",extraErrorMessage = null, placeholder, isConfirmation,required,disabled,extraStyle}:PropsType){

  let invalid:boolean = !!extraErrorMessage || input.isInvalid
  
  if(isConfirmation){
    invalid = !!(extraErrorMessage || input.value.length < 7) && input.wasTouched
  }

  return (
    <div className={styles.formControl} style={extraStyle}>
      <label className={styles.label + " " + (invalid && styles.error)}>{label} <span className={styles.required}>{required && "*"}</span>
        <input disabled={disabled} placeholder={placeholder}
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