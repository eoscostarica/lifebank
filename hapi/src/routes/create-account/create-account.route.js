const createAccountHandler = require('./create-account.handler')
const createAccountValidation = require('./create-account.validation')

module.exports = {
  method: 'POST',
  path: '/api/accounts',
  handler: createAccountHandler,
  options: {
    validate: createAccountValidation
  }
}
