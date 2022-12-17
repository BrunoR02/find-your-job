import userClient from "../config/ApolloClients/UsersClient"
import { GET_DISPLAY_INFO } from "../src/queries/users"

export type DisplayInfoType = {
  name: string
  profilePicture: string
  username: string
  id:string
}

export default async function getDisplayInfo(token:string):Promise<DisplayInfoType>{

  const resEmail = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCqlmVQQnarUyNiz7EYMKRRCleq_ZP2tXY",{
    method: "POST",
    body: JSON.stringify({idToken:token}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  const email = await resEmail.json().then(data=>data.users[0].email)

  const resUser = await fetch(`https://find-your-job-47498-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email}"`)
  
  const data = await resUser.json()
  let returnData:DisplayInfoType = {
    username: "",
    profilePicture: "",
    name: "",
    id:""
  }
  if(data && Object.keys(data).length !== 0){
    for(const key in data){
      returnData = {
        name:data[key].name,
        profilePicture:data[key].profileUrl,
        username: data[key].username,
        id: key
      }
    }
  }

  // const {data} = await userClient.mutate({mutation: GET_DISPLAY_INFO,variables:{token}})

  // const responseData = data.getDisplayInfo
  return returnData!
}