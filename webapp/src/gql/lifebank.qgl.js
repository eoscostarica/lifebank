import gql from 'graphql-tag'

export const LIFEBANK_SIGNUP_MUTATION = gql`
  mutation(
    $name: String!
    $description: String!
    $address: String!
    $location: String!
    $phoneNumber: String!
    $hasImmunityTest: Boolean!
    $bloodUrgencyLevel: Int
    $schedule: String!
  ) {
    lifebank_signup(
      name: $name
      description: $description
      address: $address
      location: $location
      phone_number: $phoneNumber
      has_immunity_test: $hasImmunityTest
      blood_urgency_level: $bloodUrgencyLevel
      schedule: $schedule
    ) {
      success
    }
  }
`
