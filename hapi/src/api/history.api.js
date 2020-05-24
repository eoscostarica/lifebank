const { hasuraUtils } = require('../utils')

const INSERT_HISTORY = `
  mutation insert($transaction: history_insert_input!) {
    insert_history_one(object: $transaction) {
      transaction_id
      processed 
      created_at
      updated_at
    }
  }
`

const GET_ONE = `
  query ($where: history_bool_exp) {
    history (where: $where, limit: 1) {
      transaction_id
      processed
      created_at
      updated_at
    }
  }
`

const getOne = async (where = {}) => {
  const { history } = await hasuraUtils.request(GET_ONE, { where })

  if (history && history.length > 0) {
    return history[0]
  }

  return null
}

const insert = transaction => {
  return hasuraUtils.request(INSERT_HISTORY, { transaction })
}

module.exports = {
  insert,
  getOne
}
