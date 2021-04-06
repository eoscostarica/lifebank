const createAccountAuthHandler = require('./create-account-auth.handler')
const createAccountAuthValidation = require('./create-account-auth.validation')

module.exports = {
  method: 'POST',
  path: '/api/accounts-auth',
  handler: createAccountAuthHandler,
  options: {
    validate: createAccountAuthValidation,
    auth: false
  }
}
