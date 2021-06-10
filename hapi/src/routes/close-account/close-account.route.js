const closeAccountHandler = require('./close-account.handler')

module.exports = {
  method: 'POST',
  path: '/api/close-account',
  handler: closeAccountHandler
}
