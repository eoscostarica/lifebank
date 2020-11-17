const createAccountLifebankHandler = require('./create-account-lifebank.handler')
const createAccountLifebankValidation = require('./create-account-lifebank.validation')

module.exports = {
  method: 'POST',
  path: '/api/create-account-lifebank',
  handler: createAccountLifebankHandler,
  options: {
    validate: createAccountLifebankValidation,
    auth: false
  }
}
