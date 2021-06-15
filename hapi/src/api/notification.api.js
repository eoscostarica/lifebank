const { hasuraUtils } = require('../utils')

const INSERT_NOTIFICATION = `
  mutation insert($notification: notification_insert_input!) {
    insert_notification_one(object: $notification) {
      id
      account_from
      account_to
      title
      description
      type
      payload
      created_at
      updated_at
    }
  }
`
const GET_ONE = `
  query ($where: notification_bool_exp) {
    notification(where: $where, order_by: {created_at: desc}, limit: 1) {
      id
      account_to
      account_from
      title
      description
      type
      payload
      created_at
    }
  }
`

const GET_MANY = `
  query ($where: notification_bool_exp) {
    notification(where: $where) {
      id
      account_to
      account_from
      title
      description
      type
      payload
      created_at
    }
  }
`

const insert = (notification) => {
  return hasuraUtils.request(INSERT_NOTIFICATION, { notification })
}

const getOne = async (where = {}) => {
  const { notification } = await hasuraUtils.request(GET_ONE, { where })

  if (notification && notification.length > 0) return notification[0]

  return null
}

const getMany = async (where = {}) => {
  const { notification } = await hasuraUtils.request(GET_MANY, { where })

  if (notification && notification.length > 0) return notification

  return null
}

module.exports = {
  insert,
  getOne,
  getMany
}
