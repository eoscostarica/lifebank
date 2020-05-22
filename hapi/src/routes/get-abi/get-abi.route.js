const getAbiHandler = require('./get-abi.handler')
const getAbiValidation = require('./get-abi.validation')

module.exports = {
  method: 'POST',
  path: '/api/contracts/get-abi',
  handler: getAbiHandler,
  options: {
    validate: getAbiValidation,
    auth: false
  }
}
