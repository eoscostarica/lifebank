const createPreRegisterHandler = require('./pre-register-lifebank.handler')
const createPreRegisterValidation = require('./pre-register-lifebank.validation')

module.exports = {
  method: 'POST',
  path: '/api/pre-register',
  handler: createPreRegisterHandler,
  options: {
    validate: createPreRegisterValidation,
    auth: false
  }
}
