const { hasuraUtils } = require('../utils')

const CHANGE_STATE = `
  mutation ($where: offer_bool_exp!, $state: String!) {
    update_offer(where: $where, _set: {state: $state}) {
      affected_rows
    }
  }
`

const desactivate = async (where) => {
  const { update_offer } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'inactive'
  })
  return update_offer.affected_rows > 0
}

const activate = async (where) => {
  const { update_offer } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'active'
  })
  return update_offer.affected_rows > 0
}

module.exports = {
  desactivate,
  activate
}
