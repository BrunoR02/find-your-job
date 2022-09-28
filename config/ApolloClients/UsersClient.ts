import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "http://localhost:3000/api/graphql"

const userClient = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export default userClient