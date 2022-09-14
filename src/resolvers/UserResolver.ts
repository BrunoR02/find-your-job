import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import {loginUser, registerUser} from "../../config/db"
import crypto from "crypto"
// @ts-ignore
import jwt from "jsonwebtoken"

//User Type

@ObjectType()
export class User{

  @Field(()=>ID)
  id!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  token!: string
}

//Inputs

@InputType()
export class RegisterUserInput{

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@InputType()
export class LoginUserInput{

  @Field()
  email!: string

  @Field()
  password!: string
}

//Payloads

@ObjectType()
export class ResponsePayload{

  @Field()
  error!: boolean

  @Field()
  message!: string
}

@ObjectType()
export class LoginPayload{

  @Field({nullable: true})
  token?: string

  @Field({nullable: true})
  name?: string

  @Field(()=>ID,{nullable: true})
  id?: string

  @Field()
  response!: ResponsePayload
}

//Main Resolver

@Resolver()
export default class UserResolver{

  @Query(()=>User)
  getUsers(){
    console.log("dummy query")
    return {
      id: "2",
      name: "Bruno",
      email: "kkk@kkk.com",
      password: "bora la",
      token: "123"
    }
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

    const token = jwt.sign(
      {user_id:data.id, email:input.email},
      process.env.JWT_SECRET,
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
}