const fastRegisterLifebankHandler = require('./fast-register-lifebanks.handler')
const fastRegisterLifebankValidation = require('./fast-register-lifebanks.validation')

module.exports = {
  method: 'POST',
  path: '/api/fast-register-lifebank',
  handler: fastRegisterLifebankHandler,
  options: {
    auth: false
  }
}
