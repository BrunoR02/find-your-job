import userClient from "../config/ApolloClients/UsersClient"
import { GET_DISPLAY_INFO } from "../src/queries/users"

export type DisplayInfoType = {
  name: string
  profilePicture: string
  savedJobs: string[]
  id: string
}

export default async function getDisplayInfo(token:string):Promise<DisplayInfoType>{
  
  const {data} = await userClient.mutate({mutation: GET_DISPLAY_INFO,variables:{token}})

  const responseData = data.getDisplayInfo

  return responseData
}