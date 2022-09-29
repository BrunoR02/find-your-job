import { ApolloClient, InMemoryCache } from "@apollo/client";

let uri:string;

if(process.env.NODE_ENV === "development"){
  uri = "http://localhost:3000/api/graphql"
} else {
  uri = "https://find-your-job.vercel.app/api/graphql"
}

console.log(process.env.NODE_ENV)

const userClient = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export default userClient