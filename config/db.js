import {createConnection} from "mysql2/promise"
import bcrypt from "bcryptjs"

export async function connect(){
  if(global.connection && global.connection.state !== "disconnected"){
    return global.connection
  }

  const connection = await createConnection(process.env.MYSQL_CONNECTION)
  console.log("Connected to MySQL Database!")
  global.connection = connection
  return connection
}

export async function registerUser({id,name,email,password}){
  const conn = await connect()

  const savedJobs = JSON.stringify([])

  const encryptedPassword = await bcrypt.hash(password,10)

  let responseMessage;
  let error = "";

  await conn.query("INSERT INTO users (id,name,email,password,savedJobs) VALUES (?,?,?,?,?)",[id,name,email,encryptedPassword,savedJobs]).catch(err=>error=err.message)

  responseMessage = "User was registered successfully!"
  let hasError = error !== ""

  if(hasError && error.includes("email")){
    responseMessage = "This email already exists! Try another."
  }

  return {error: hasError, message: responseMessage}
}

export async function loginUser({email,password}){
  const conn = await connect()

  const accountData = await conn.query("SELECT id,password FROM users WHERE email=?",[email])

  if(accountData[0].length === 0){
    return {data: {}, error: true, message:"Email is not registered yet. Register it first."}
  }

  //Check if password is the correct to the account
  const accountPassword = accountData[0][0].password
  const passwordIsCorrect = await bcrypt.compare(password,accountPassword)

  if(!passwordIsCorrect){
    return {data: {}, error:true, message:"Incorrect password. Try again."}
  }

  const {id} = accountData[0][0]

  return {data: {id}, error: false, message: "Logged in!"}
}

export async function updateSavedJobs(savedJobs,email){
  const conn = await connect()

  const savedJobsJSON = JSON.stringify(savedJobs)

  let responseMessage;
  let error = "";

  await conn.query("UPDATE users SET savedJobs=? WHERE email=?",[savedJobsJSON,email]).catch(err=>error=err.message)

  responseMessage = "Job saved successfuly"
  
  let hasError = error !== ""

  if(hasError){
    responseMessage = error
  }

  return {error:hasError,message:responseMessage}
}

export async function getSavedJobs(email){
  const conn = await connect()

  const data = await conn.query("SELECT savedJobs FROM users WHERE email=?",[email])

  const savedJobs = data[0][0].savedJobs


  return savedJobs
}

export async function changeProfilePicture({url,email}){
  const conn = await connect()

  let responseMessage;
  let error="";

  await conn.query("UPDATE users SET profileUrl=? WHERE email=?",[url,email]).catch(err=>error=err.message)

  responseMessage = "Profile picture updated!"
  const hasError = error !== ""

  if(hasError){
    responseMessage = error
  }

  return {
    error: hasError, message: responseMessage
  }
}
