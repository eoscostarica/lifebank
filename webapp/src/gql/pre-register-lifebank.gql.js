import gql from 'graphql-tag'

export const CREATE_PRE_REGITER_LIFEBANK_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
    $name: String!
    $address: String!
    $schedule: String!
    $phone: String!
    $description: String!
    $urgency_level: Int!
    $coordinates: String!
    $immunity_test: Boolean!
    $invitation_code: String!
  ) {
    create_pre_register_lifebank(
      email: $email
      password: $password
      name: $name
      address: $address
      schedule: $schedule
      phone: $phone
      description: $description
      urgency_level: $urgency_level
      coordinates: $coordinates
      immunity_test: $immunity_test
      invitation_code: $invitation_code
    ) {
      resultRegister
    }
  }
`

export const VALIDATION_EMAIL = gql`
  query($email: String!) {
    preregister_lifebank(where: { email: { _eq: $email } }) {
      email
    }
    user(where: { email: { _eq: $email } }) {
      email
    }
  }
`
