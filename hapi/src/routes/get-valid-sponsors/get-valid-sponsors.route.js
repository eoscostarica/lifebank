const getValidSponsorsHandler = require('./get-valid-sponsors.handler')

module.exports = {
  method: 'POST',
  path: '/api/get-valid-sponsors',
  handler: getValidSponsorsHandler,
  options: {
    auth: false
  }
}
