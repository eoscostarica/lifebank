import ApolloClient from 'apollo-boost'

import { graphqlConfig } from './config'

export const client = new ApolloClient({
  uri: graphqlConfig.url,
  request: (operation) => {
    const token = localStorage.getItem('token')

    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  }
})
