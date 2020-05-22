const createAccountRoute = require('./create-account/create-account.route')
const donorSignup = require('./donor-signup/donor-signup.route')
const getAbiRoute = require('./get-abi/get-abi.route')

module.exports = [createAccountRoute, donorSignup, getAbiRoute]
