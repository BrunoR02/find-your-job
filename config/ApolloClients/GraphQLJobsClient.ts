import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.graphql.jobs/",
  cache: new InMemoryCache()
})

export default client