import { gql } from "@apollo/client";

export const GET_JOB_LIST = gql`
  query($limit: Int,$searchTitle: String){
    commitments{
      title
      jobs(first: $limit,where: {isPublished: true,title_contains:$searchTitle,cities_some:{name_not:null}}){
        id
        title
        tags{name}
        description
        cities{name}
        countries{isoCode}
        company{name}
        remotes{name} 
      }
    }
  }
`

export const GET_JOB_LIST_REMOTE = gql`
  query($limit: Int,$searchTitle: String){
    commitments{
      title
      jobs(first: $limit,where: {isPublished: true,title_contains:$searchTitle,cities_some:{name_not:null},remotes_some:{type_not:null}}){
        id
        title
        tags{name}
        description
        cities{name}
        countries{isoCode}
        company{name}
        remotes{name} 
      }
    }
  }
`
export const GET_JOB_LIST_ONSITE = gql`
  query($limit: Int,$searchTitle: String){
    commitments{
      title
      jobs(first: $limit,where: {isPublished: true,title_contains:$searchTitle,cities_some:{name_not:null},remotes_every:{type_not:"remote"}}){
        id
        title
        tags{name}
        description
        cities{name}
        countries{isoCode}
        company{name}
        remotes{name} 
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
        tags{name}
        description
        cities{name}
        countries{isoCode}
        company{name}
        remotes{name}
      }
    }
  }
`