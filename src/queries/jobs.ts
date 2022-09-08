import { gql } from "@apollo/client";

export const GET_JOB_LIST = gql`
  query($limit: Int,$searchTitle: String){
    commitments{
      title
      jobs(first: $limit,where: {isPublished: true,title_contains:$searchTitle}){
        id
        title
        tags{
          name
        }
        description
        locationNames
        company{name}
      }
    }
  }
`

export const GET_FAVORITE_JOBS = gql`
  query($ids: [ID!]){
    commitments{
      title
      jobs(where: {isPublished: true,id_in:$ids}){
        id
        title
        tags{
          name
        }
        description
        locationNames
        company{name}
      }
    }
  }
`