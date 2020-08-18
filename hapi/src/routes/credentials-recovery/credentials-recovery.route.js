const credentialsRecoveryHandler = require('./credentials-recovery.handler')
const credentialsRecoveryValidation = require('./credentials-recovery.validation')

module.exports = {
  method: 'POST',
  path: '/api/credentials-recovery',
  handler: credentialsRecoveryHandler,
  options: {
    validate: credentialsRecoveryValidation,
    auth: false
  }
}
