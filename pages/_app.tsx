import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { ApolloProvider } from '@apollo/client'
import client from "../config/ApolloClient"
import { FavoriteContextProvider } from '../src/store/FavoriteContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <FavoriteContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavoriteContextProvider>
    </ApolloProvider>
    
  )
}

export default MyApp
