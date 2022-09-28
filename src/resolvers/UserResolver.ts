import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {changeProfilePicture, getDisplayInfo, loginUser, registerUser, updateSavedJobs, updateUserProfile} from "../../config/db"
import crypto from "crypto"
import {JwtPayload, sign, verify} from "jsonwebtoken"
import { ChangeProfilePictureInput, GetDisplayInfoPayload, LoginPayload, LoginUserInput, ResponsePayload, SignupUserInput, UpdateSavedJobsInput, UpdateUserProfileInput } from "./UserTypes";

//Main Resolver

@Resolver()
export default class UserResolver{

  @Query(()=>String)
  loadClient(){
    return "Loaded User Client!"
  }

  @Mutation(()=>ResponsePayload)
  async signup(@Arg("input") input:SignupUserInput){
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
        expiresIn: "2d",
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

  @Mutation(()=>GetDisplayInfoPayload)
  async getDisplayInfo(@Arg("token") token: string){

    //Get email from token to retrieve the right data from MySQL Database.
    const {email} = verify(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload
    
    const data = await getDisplayInfo(email)

    return {...data}
  }

  @Mutation(()=>ResponsePayload)
  async changeProfilePicture(@Arg("input") input: ChangeProfilePictureInput){

    const {error,message} = await changeProfilePicture({...input})
    
    return {error,message}
  }

  @Mutation (()=>ResponsePayload)
  async updateUserProfile(@Arg("input") input: UpdateUserProfileInput){

    const {email} = verify(input.token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) as JwtPayload

    const data = {
      name: input.name,
      location: input.location,
      title: input.title,
      profilePicture: input.profilePicture,
      bio: input.bio,
      email
    }

    const {error,message} = await updateUserProfile({...data})

    return {error,message}
  }
}