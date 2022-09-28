import styles from "./NotFoundMessage.module.css"

export default function NotFoundMessage({message}:{message:string}){
  return (
    <div className={styles.alertMessage}>{message}</div>
  )
}