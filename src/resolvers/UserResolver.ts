import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import {changeProfilePicture, getUserData, loginUser, registerUser, updateSavedJobs} from "../../config/db"
import crypto from "crypto"
import {JwtPayload, sign, verify} from "jsonwebtoken"

//Inputs

@InputType()
class RegisterUserInput{

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  location!: string

  @Field()
  title!: string
}

@InputType()
class LoginUserInput{

  @Field()
  email!: string

  @Field()
  password!: string
}

@InputType()
class UpdateSavedJobsInput{

  @Field()
  token!: string

  @Field(()=>[String])
  savedJobs!: string[]
}

@InputType()
class ChangeProfilePictureInput{

  @Field()
  url!: string

  @Field()
  email!: string
}

//Payloads

@ObjectType()
class ResponsePayload{

  @Field()
  error!: boolean

  @Field()
  message!: string
}

@ObjectType()
class GetUserDataPayload{

  @Field(()=>[String])
  savedJobs!: string[]

  @Field()
  name!: string

  @Field()
  profilePicture!:string
}

@ObjectType()
class LoginPayload{

  @Field({nullable: true})
  token?: string

  @Field()
  response!: ResponsePayload
}

//Main Resolver

@Resolver()
export default class UserResolver{

  @Query(()=>String)
  loadClient(){
    return "Loaded User Client!"
  }

  @Mutation(()=>ResponsePayload)
  async register(@Arg("input") input:RegisterUserInput){
    const id = crypto.randomUUID()

    const {error,message} = await registerUser({...input,id})

    return {
      error,
      message
    }
  }

  @Mutation(()=>LoginPayload)
  async login(@Arg("input") input: LoginUserInput){

    const {data,error,message} = await loginUser({...input})

    if(error){
      return {
        response: {error,message}
      }
    }

    //Sign Token with user info
    const token = sign(
      {user_id:data.id, email:input.email},
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
      {
        expiresIn: "2h"
      }
    )

    return {
      token,
      ...data,
      response: {message,error}
    }
  }

  @Mutation(()=>ResponsePayload)
  async updateSavedJobs(@Arg("input") input: UpdateSavedJobsInput){

    //Get email from token to insert data on the right place on MySQL Database.
    const {email} = verify(input.token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload
    
    const {error,message} = await updateSavedJobs(input.savedJobs,email)

    return {error,message}
  }

  @Mutation(()=>GetUserDataPayload)
  async getUserData(@Arg("token") token: string){

    //Get email from token to retrieve the right data from MySQL Database.
    const {email} = verify(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload
    
    const data = await getUserData(email)

    return {...data}
  }

  @Mutation(()=>ResponsePayload)
  async changeProfilePicture(@Arg("input") input: ChangeProfilePictureInput){

    const {error,message} = await changeProfilePicture({...input})
    
    return {error,message}
  }
}