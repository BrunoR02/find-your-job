import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions, RootState } from "../../src/stores/alert-store"

import styles from "./Alert.module.css"

export default function Alert(){
    const dispatch = useDispatch()
    const {alertOn,type,message} = useSelector((state:RootState)=>state)
    const [classAnimate,setClassAnimate] = useState<string>("")
    
    const animateFade = useCallback(()=>{
        setClassAnimate(styles.alertFadeout)
        setTimeout(()=>{
            dispatch(actions.closeAlert())
        },2000)
    },[dispatch])

    useEffect(()=>{
        if(alertOn){
            setTimeout(()=>{
                animateFade()
            },5000)
        }
    },[alertOn, animateFade])
       
    let alertTypeClass;

    if(type === "success"){
        alertTypeClass = styles.alertSuccess
    } else if(type === "error"){
        alertTypeClass = styles.alertError
    } else if(type === "warning"){
        alertTypeClass = styles.alertWarning
    }

    return(
        <div className={`${styles.alert} ${alertTypeClass} ${classAnimate}`}>
            <button onClick={()=>{dispatch(actions.closeAlert())}} className={styles.alertClose}></button>
            <p className={styles.alertMessage}>{message}</p>
        </div>
    )
}