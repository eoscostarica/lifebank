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

const GET_INFO = `
query info($account: String!) {
  location(where: {account: {_eq: $account}}) {
    info
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

const VERIFY_EXISTENCE = `
  query verify($account: String!) {
    location(where: {account: {_eq: $account}}) {
      location_type {
        locations_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`

const CHANGE_STATE = `
  mutation ($where: location_bool_exp!, $state: String!) {
    update_location(where: $where, _set: {state: $state}) {
      affected_rows
    }
  }
`

const DELETE = `
  mutation ($where: location_bool_exp!) {
    delete_location(where: $where) {
      affected_rows
    }
  }
`

const insert = (location) => hasuraUtils.request(INSERT, { location })

const verifyExistence = (account) =>
  hasuraUtils.request(VERIFY_EXISTENCE, { account })

const update = (account, location) =>
  hasuraUtils.request(UPDATE, { account, location })

const infoQuery = (account) => hasuraUtils.request(GET_INFO, { account })

const desactivate = async (where) => {
  const { update_location } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'inactive'
  })
  return update_location.affected_rows > 0
}

const activate = async (where) => {
  const { update_location } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'active'
  })
  return update_location.affected_rows > 0
}

const permanentDelete = async (where) => {
  const { delete_location } = await hasuraUtils.request(DELETE, { where })
  return delete_location.affected_rows > 0
}

module.exports = {
  insert,
  verifyExistence,
  update,
  infoQuery,
  desactivate,
  activate,
  permanentDelete
}
