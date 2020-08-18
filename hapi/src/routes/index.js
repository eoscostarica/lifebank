const checkUsernameRoute = require('./check-username/check-username.route')
const createAccountRoute = require('./create-account/create-account.route')
const credentialsRecoveryRoute = require('./credentials-recovery/credentials-recovery.route')
const editProfileRoute = require('./edit-profile/edit-profile.route')
const getcontractRoute = require('./get-contract/get-contract.route')
const grantConsentRoute = require('./grant-consent/grant-consent.route')
const loginRoute = require('./login/login.route')
const profileRoute = require('./profile/profile.route')
const revokeConsentRoute = require('./revoke-consent/revoke-consent.route')
const signupRoute = require('./signup/signup.route')
const transferRoute = require('./transfer/transfer.route')

module.exports = [
  checkUsernameRoute,
  createAccountRoute,
  credentialsRecoveryRoute,
  editProfileRoute,
  getcontractRoute,
  grantConsentRoute,
  loginRoute,
  profileRoute,
  revokeConsentRoute,
  signupRoute,
  transferRoute
]
