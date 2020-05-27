const { hasuraUtils } = require('../utils')

const INSERT = `
  mutation location($location: location_insert_input!) {
    insert_location_one(object: $location) {
      id
      name
      geolocation
      type
    }
  }
`

const insert = location => hasuraUtils.request(INSERT, { location })

module.exports = {
  insert
}
