const { hasuraUtils } = require('../utils')

const INSERT = `
  mutation ($location: location_insert_input!) {
    insert_location_one(object: $location) {
      id
      name
      description
      phone_number
      type
      lng
      lat
      created_at
      updated_at
    }
  }
`

const insert = location => {
  return hasuraUtils.request(INSERT, { location })
}

module.exports = {
  insert
}
