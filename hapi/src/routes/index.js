const checkUsernameRoute = require('./check-username/check-username.route')
const createAccountRoute = require('./create-account/create-account.route')
const credentialsRecoveryRoute = require('./credentials-recovery/credentials-recovery.route')
const getAbiRoute = require('./get-abi/get-abi.route')
const grantConsentRoute = require('./grant-consent/grant-consent.route')
const loginRoute = require('./login/login.route')
const profileRoute = require('./profile/profile.route')
const revokeConsentRoute = require('./revoke-consent/revoke-consent.route')
const signupRoute = require('./signup/signup.route')

module.exports = [
  checkUsernameRoute,
  createAccountRoute,
  credentialsRecoveryRoute,
  getAbiRoute,
  grantConsentRoute,
  loginRoute,
  profileRoute,
  revokeConsentRoute,
  signupRoute
]
