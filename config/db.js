import {createConnection} from "mysql2/promise"

async function connect(){
  if(global.connection && global.connection.state !== "disconnected"){
    return global.connection
  }

  const connection = await createConnection("mysql://admin:nsvs6pv14nhn00@find-your-job.cocajfxavccs.sa-east-1.rds.amazonaws.com:3306/usersdata")
  console.log("Connected to MySQL Database!")
  global.connection = connection
  return connection
}

export async function registerUser({id,name,email,password}){
  const conn = await connect()

  const savedJobs = JSON.stringify([])

  let responseMessage;
  let error = "";

  await conn.query("INSERT INTO users VALUES (?,?,?,?,?)",[id,name,email,password,savedJobs]).catch(err=>error=err.message)

  responseMessage = "User was registered successfully!"
  let hasError = error !== ""

  if(hasError && error.includes("email")){
    responseMessage = "This email already exists! Try another."
  }

  return {error: hasError, message: responseMessage}
}

export async function loginUser({email,password}){
  const conn = await connect()

  const emailData = await conn.query("SELECT id,email,name FROM users WHERE email=?",[email])

  if(emailData[0].length === 0){
    return {data: [], error: true, message:"Email is not registered yet. Register it first."}
  }

  const userData = await conn.query("SELECT id,email,name FROM users WHERE email=? and password=?",[email,password])

  if(userData[0].length === 0){
    return {data: [], error:true, message:"Incorrect password. Try again."}
  }

  return {data: userData[0], error: false, message: "Logged in!"}
}
