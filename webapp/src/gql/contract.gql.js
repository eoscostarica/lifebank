import gql from 'graphql-tag'

export const GET_CONTRACT_QUERY = gql`
  query($name: String!) {
    get_contract(name: $name) {
      name
      hash
      abi
    }
  }
`

export const GET_CONTRACTS_QUERY = gql`
  query {
    consent2life: get_contract(name: "consent2life") {
      name
      hash
      abi
    }
    lifebankcode: get_contract(name: "lifebankcode") {
      name
      hash
      abi
    }
    lifebankcoin: get_contract(name: "lifebankcoin") {
      name
      hash
      abi
    }
  }
`
