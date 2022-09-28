import { ApolloError, ServerError } from "@apollo/client";
import styles from "./ApolloErrorMessage.module.css"

export default function ApolloErrorMessage({error}: {error:ApolloError}){
  return (
    <div className={styles.errorMessage}>Error to Fetch (GRAPHQL): {
      error.networkError && JSON.stringify((error.networkError as ServerError).result?.errors[0].message) || 
      error.message && JSON.stringify(error.message)
    }</div>
  )
}