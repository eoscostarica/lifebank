const getNotificationsHandler = require('./get-notifications.handler')

module.exports = {
  method: 'POST',
  path: '/api/get-notifications',
  handler: getNotificationsHandler
}
