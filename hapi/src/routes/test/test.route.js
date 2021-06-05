const testHandler = require('./test.handler')

module.exports = {
  method: 'POST',
  path: '/api/test',
  handler: testHandler,
  options: {
    auth: false
  }
}
