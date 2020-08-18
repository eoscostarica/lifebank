const loginHandler = require('./login.handler')
const loginValidation = require('./login.validation')

module.exports = {
  method: 'POST',
  path: '/api/login',
  handler: loginHandler,
  options: {
    validate: loginValidation,
    auth: false
  }
}
