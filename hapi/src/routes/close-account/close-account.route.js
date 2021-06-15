const closeAccountHandler = require('./close-account.handler')
const closeAccountValidation = require('./close-account.validation')

module.exports = {
  method: 'POST',
  path: '/api/close-account',
  handler: closeAccountHandler,
  options: {
    validate: closeAccountValidation,
    auth: false
  }
}
