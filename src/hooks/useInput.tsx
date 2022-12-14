import { ChangeEvent, useEffect, useState } from "react";

type OptionsType = {
    type: "name" | "username" | "title" | "location" | "email" | "login" | "password" | "novalidate"
    form?: "register" | "login"
    initialValue?: string
}

export default function useInput({type,form="register",initialValue=""}:OptionsType){
    const [enteredValue, setEnteredValue] = useState<string>(initialValue)
    const [inputIsTouched, setInputIsTouched] = useState(false)
    const [isValid,setIsValid] = useState(false)
    const [error, setError] = useState<string | null>(null)

    let inputType = type
    let formType = form

    useEffect(()=>{
        setError(null)
        let errorMessage:string | null = null;
        if(inputType==="name"){
            let testValidation = !(!(/^[A-Z a-z]+$/.test(enteredValue)) || (enteredValue.indexOf(" ") === 0) || enteredValue.length < 2)
            
            if(!testValidation){errorMessage = "Please enter a valid name. \n For example: Robert Johnson"}
            
            setIsValid(errorMessage === null)
        } else if(inputType==="username"){
            let testValidation = !(!(/^[a-zA-Z0-9]+$/.test(enteredValue)) || (enteredValue.indexOf(" ") === 0) || enteredValue.length < 4)

            if(!testValidation){errorMessage = "Please enter a valid username. \n For example: brunolucas02"}
            
            setIsValid(errorMessage === null)
        } else if(inputType==="title"){
            let testValidation = !(!(/^[A-Z a-z]+$/.test(enteredValue)) || (enteredValue.indexOf(" ") === 0) || enteredValue.length < 4)
            
            if(!testValidation){errorMessage = "Please enter a valid title. \n For example: Frontend Developer"}
            
            setIsValid(errorMessage === null)
        } else if(inputType==="location"){
            let testValidation = !(!(/^[A-Z a-z,]+$/.test(enteredValue)) || (enteredValue.indexOf(" ") === 0) || enteredValue.length < 4)
            
            if(!testValidation){errorMessage = "Please enter a valid location. \n For example: Austin, Texas"}
            
            setIsValid(errorMessage === null)
        } else if(inputType === "email"){
            if(formType === "register"){
                let testValidation = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enteredValue))
            
                if(!testValidation){
                    errorMessage = "Please enter a valid email. \n For example: xxx@xx.xx"
                }
            } else if(formType === "login"){
                let testValidation = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enteredValue))
            
                if(!testValidation){
                    errorMessage = "Please enter a valid email."
                }
            }
            
            setIsValid(errorMessage === null)
        } else if (inputType==="password"){
            if(formType === "register"){
                let testValidation = !(/[A-Z]/.test(enteredValue)) || !(/\d/.test(enteredValue)) || enteredValue.trim().length < 7
                
                if(testValidation){
                    errorMessage = "Please enter a valid password: \n 1. Must be atleast 7 characters! \n 2. Must have 1 number! \n 3. Must have 1 in Capital Case!"
                }
            } else if( formType === "login"){   
                let testValidation = enteredValue.trim().length < 7
                
                if(testValidation){
                    errorMessage = "Please enter a valid password."
                }
            }
            setIsValid(errorMessage === null)
        }
        setError(errorMessage)
    },[enteredValue,inputType,formType,error])

    const inputIsInvalid = !isValid && inputIsTouched

    function resetInput(){
        setEnteredValue("")
        setInputIsTouched(false)
    }

    return {
        value: enteredValue,
        errorMsg: error,
        isValid,
        isInvalid: inputIsInvalid,
        wasTouched: inputIsTouched,
        changeHandler: (event:ChangeEvent<HTMLInputElement>) =>{setEnteredValue(event.target.value)},
        blurHandler: ()=>{setInputIsTouched(true)},
        resetInput,
    }
}