const getContractHandler = require('./get-contract.handler')
const getContractValidation = require('./get-contract.validation')

module.exports = {
  method: 'POST',
  path: '/api/get-contract',
  handler: getContractHandler,
  options: {
    validate: getContractValidation,
    auth: false
  }
}
