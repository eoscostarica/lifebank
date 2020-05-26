const createAccountRoute = require('./create-account/create-account.route')
const donorSignup = require('./donor-signup/donor-signup.route')
const getAbiRoute = require('./get-abi/get-abi.route')
const grantConsentRoute = require('./grant-consent/grant-consent.route')
const lifebankSignupRoute = require('./lifebank-signup/lifebank-signup.route')
const loginRoute = require('./login/login.route')
const profileRoute = require('./profile/profile.route')
const revokeConsentRoute = require('./revoke-consent/revoke-consent.route')
const sponsorSignup = require('./sponsor-signup/sponsor-signup.route')

module.exports = [
  createAccountRoute,
  donorSignup,
  getAbiRoute,
  grantConsentRoute,
  lifebankSignupRoute,
  loginRoute,
  profileRoute,
  sponsorSignup,
  revokeConsentRoute
]
