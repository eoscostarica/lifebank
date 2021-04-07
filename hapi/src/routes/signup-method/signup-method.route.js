const signupMethodHandler = require('./signup-method.handler')

module.exports = {
  method: 'POST',
  path: '/api/signup-method',
  handler: signupMethodHandler,
  options: {
    auth: false
  }
}
