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

const UPDATE = `
  mutation location($account: String!, $location: location_set_input!) {
    update_location(where: {account: {_eq: $account}}, _set: $location) {
      affected_rows
    }
  }
`

const insert = location => hasuraUtils.request(INSERT, { location })
const update = (account, location) =>
  hasuraUtils.request(UPDATE, { account, location })

module.exports = {
  insert,
  update
}
