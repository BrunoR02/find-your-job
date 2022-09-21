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

export const GET_SAVED_JOBS = gql`
  mutation($token: String!){
    getSavedJobs(token: $token){
      savedJobs
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