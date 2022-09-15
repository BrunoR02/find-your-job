import { gql } from "@apollo/client";


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
      id
      name
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