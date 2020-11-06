const createAccountLifebankHandler = require('./create-account-Lifebank.handler')
const createAccountLifebankValidation = require('./create-account-Lifebank.validation')

module.exports = {
  method: 'POST',
  path: '/api/create-account-Lifebank',
  handler: createAccountLifebankHandler,
  options: {
    validate: createAccountLifebankValidation,
    auth: false
  }
}
