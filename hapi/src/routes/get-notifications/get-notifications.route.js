const getNotificationsHandler = require('./get-notifications.handler')
const getNotificationsValidation = require('./get-notifications.validation')

module.exports = {
  method: 'POST',
  path: '/api/get-notifications',
  handler: getNotificationsHandler,
  options: {
    validate: getNotificationsValidation,
    auth: false
  }
}
