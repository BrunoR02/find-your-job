import { gql } from "@apollo/client";

export const LOAD_CLIENT = gql`
  query{
    loadClient
  }
`

export const SIGNUP_USER = gql`
  mutation($input: SignupUserInput!){
    signup(input: $input){
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

export const GET_DISPLAY_INFO = gql`
  mutation($token: String!){
    getDisplayInfo(token: $token){
      savedJobs
      name
      profilePicture
      id
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

export const UPDATE_USER_PROFILE = gql`
  mutation($input: UpdateUserProfileInput!){
    updateUserProfile(input:$input){
      error
      message
    }
  }
`