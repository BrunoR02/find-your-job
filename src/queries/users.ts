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