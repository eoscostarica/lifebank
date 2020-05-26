const lifebankSignupHandler = require('./lifebank-signup.handler')
const lifebankSignupValidation = require('./lifebank-signup.validation')

module.exports = {
  method: 'POST',
  path: '/api/lifebanks',
  handler: lifebankSignupHandler,
  options: {
    validate: lifebankSignupValidation
  }
}
