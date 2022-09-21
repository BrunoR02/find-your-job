import userClient from "../config/ApolloClients/UsersClient"
import { GET_USER_DATA } from "../src/queries/users"

export type UserDataType = {
  name: string
  profilePicture: string
  savedJobs: string[]
}

export default async function getUserData(token:string):Promise<UserDataType>{
  
  const {data} = await userClient.mutate({mutation: GET_USER_DATA,variables:{token}})

  const responseData = data.getUserData

  return responseData
}