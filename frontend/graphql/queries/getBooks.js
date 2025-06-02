import { gql } from '@apollo/client/core'

export const GetBooks = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`
