import gql from 'graphql-tag'

export const GET_ABI_QUERY = gql`
  query($contract: String!) {
    get_abi(contract: $contract) {
      abi
    }
  }
`
