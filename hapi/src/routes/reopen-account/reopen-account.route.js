const reopenAccountHandler = require('./reopen-account.handler')
const reopenAccountValidation = require('./reopen-account.validation')

module.exports = {
  method: 'POST',
  path: '/api/reopen-account',
  handler: reopenAccountHandler,
  options: {
    validate: reopenAccountValidation,
    auth: false
  }
}
