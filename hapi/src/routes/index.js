const createAccountRoute = require('./create-account/create-account.route')
const donorSignup = require('./donor-signup/donor-signup.route')
const getAbiRoute = require('./get-abi/get-abi.route')
const loginRoute = require('./login/login.route')
const profileRoute = require('./profile/profile.route')
const sponsorSignup = require('./sponsor-signup/sponsor-signup.route')

module.exports = [
  createAccountRoute,
  donorSignup,
  getAbiRoute,
  loginRoute,
  profileRoute,
  sponsorSignup
]
