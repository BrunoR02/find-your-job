import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { ApolloProvider } from '@apollo/client'
import client from "../config/GraphQLJobsClient"
import { FavoriteContextProvider } from '../src/stores/FavoriteContext'
import { AuthContextProvider} from "../src/stores/authContext"
import {Provider} from "react-redux"
import store from '../src/stores/alert-store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <FavoriteContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FavoriteContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </Provider>
    
  )
}

export default MyApp
