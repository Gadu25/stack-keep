import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const link = createHttpLink({
    uri: 'http://localhost:4000/graphql', // your backend URL
  })

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  nuxtApp.provide('apollo', apolloClient)
})