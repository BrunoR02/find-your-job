import { Arg, Args, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

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
export class RegisterPayload{

  @Field()
  error!: boolean

  @Field()
  message!: string
}

@ObjectType()
export class LoginPayload{

  @Field()
  token!: string

  @Field()
  name!: string

  @Field()
  email!: string
}

//Main Resolver

@Resolver()
export default class UserResolver{

  @Query(()=>User)
  getUsers(){
    console.log("ata")
    return {
      id: "2",
      name: "Bruno",
      email: "kkk@kkk.com",
      password: "bora la",
      token: "123"
    }
  }

  @Mutation(RegisterUserInput=>RegisterPayload)
  register(@Arg("input") input:RegisterUserInput){
    console.log(input)
    return {
      error: false,
      message: "Created User!"
    }
  }

  @Mutation(LoginUserInput=>LoginPayload)
  login(@Arg("input") input: LoginUserInput){
    return {
      name: "Bruno",
      email: "kkk@kkk.com",
      token: "123"
    }
  }
}