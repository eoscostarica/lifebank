import gql from 'graphql-tag'

export const GET_NEARBY_LOCATIONS_QUERY = gql`
  query nearbyLocations($distance: Float!, $point: geography!) {
    locations: location(
      where: {
        geolocation: { _st_d_within: { distance: $distance, from: $point } }
      }
    ) {
      id
      geolocation
      name
      type
    }
  }
`
