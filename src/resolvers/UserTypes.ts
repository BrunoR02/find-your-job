//Inputs

import { Field, InputType, ObjectType } from "type-graphql"

@InputType()
export class SignupUserInput{

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
export class LoginUserInput{

  @Field()
  email!: string

  @Field()
  password!: string
}

@InputType()
export class UpdateSavedJobsInput{

  @Field()
  token!: string

  @Field(()=>[String])
  savedJobs!: string[]
}

@InputType()
export class ChangeProfilePictureInput{

  @Field()
  url!: string

  @Field()
  email!: string
}

@InputType()
export class UpdateUserProfileInput{

  @Field()
  token!: string

  @Field()
  name!: string

  @Field()
  location!: string

  @Field()
  title!: string

  @Field()
  bio!: string

  @Field()
  profilePicture!: string
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
export class GetDisplayInfoPayload{

  @Field(()=>[String])
  savedJobs!: string[]

  @Field()
  name!: string

  @Field()
  profilePicture!:string

  @Field()
  id!: string
}

@ObjectType()
export class LoginPayload{

  @Field({nullable: true})
  token?: string

  @Field()
  response!: ResponsePayload
}
