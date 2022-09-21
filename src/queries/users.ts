import { gql } from "@apollo/client";

export const LOAD_CLIENT = gql`
  query{
    loadClient
  }
`

export const REGISTER_USER = gql`
  mutation($input: RegisterUserInput!){
    register(input: $input){
      error
      message
    }
  }
`

export const LOGIN_USER = gql`
  mutation($input: LoginUserInput!){
    login(input: $input){
      token
      response{
        error
        message
      }
    }
  }
`

export const UPDATE_SAVED_JOBS = gql`
  mutation($input: UpdateSavedJobsInput!){
    updateSavedJobs(input: $input){
      error
      message
    }
  }
`

export const GET_USER_DATA = gql`
  mutation($token: String!){
    getUserData(token: $token){
      savedJobs
      name
      profilePicture
    }
  }
`

export const CHANGE_PROFILE_PICTURE = gql`
  mutation($input: ChangeProfilePictureInput!){
    changeProfilePicture(input:$input){
      error
      message
    }
  }
`