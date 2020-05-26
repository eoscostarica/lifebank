const revokeConsentHandler = require('./revoke-consent.handler')

module.exports = {
  method: 'POST',
  path: '/api/revoke-consent',
  handler: revokeConsentHandler
}
