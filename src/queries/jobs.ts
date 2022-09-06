import { gql } from "@apollo/client";

export const GET_JOB_LIST = gql`
  query($limit: Int){
    commitments{
      title
      jobs(first: $limit,where: {isPublished: true}){
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