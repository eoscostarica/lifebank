const runMonthlyHandler = require('./run-monthly.handler')
const runMonthlyValidation = require('./run-monthly.validation')

module.exports = {
  method: 'GET',
  path: '/api/run-monthly',
  handler: runMonthlyHandler,
  options: {
    // validate: runMonthlyValidation,
    auth: false
  }
}
