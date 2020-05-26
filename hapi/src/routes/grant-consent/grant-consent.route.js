const grantConsentHandler = require('./grant-consent.handler')

module.exports = {
  method: 'POST',
  path: '/api/grant-consent',
  handler: grantConsentHandler
}
