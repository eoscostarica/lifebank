const transferHandler = require('./transfer.handler')
const transferValidation = require('./transfer.validation')

module.exports = {
  method: 'POST',
  path: '/api/transfer',
  handler: transferHandler,
  options: {
    validate: transferValidation
  }
}
