const changePasswordRoute = require('./change-password/change-password.route')
const changeEmailRoute = require('./change-email/change-email.route')
const checkUsernameRoute = require('./check-username/check-username.route')
const createAccountRoute = require('./create-account/create-account.route')
const createAccountAuthRoute = require('./create-account-auth/create-account-auth.route')
const credentialsRecoveryRoute = require('./credentials-recovery/credentials-recovery.route')
const editProfileRoute = require('./edit-profile/edit-profile.route')
const editNotificationStateRoute = require('./edit-notification-state/edit-notification-sate.route')
const getcontractRoute = require('./get-contract/get-contract.route')
const getValidSponsorsRoute = require('./get-valid-sponsors/get-valid-sponsors.route')
const grantConsentRoute = require('./grant-consent/grant-consent.route')
const loginRoute = require('./login/login.route')
const sendEmailRoute = require('./send-email/send-email.route')
const profileRoute = require('./profile/profile.route')
const revokeConsentRoute = require('./revoke-consent/revoke-consent.route')
const signupRoute = require('./signup/signup.route')
const transferRoute = require('./transfer/transfer.route')
const preregisterLifebankRoute = require('./pre-register/pre-register-lifebank.route')
const registerLifebankRoute = require('./create-account-lifebank/create-account-lifebank.route')
const verifyEmailRouteRoute = require('./verify-email/verify-email.route')
const getValidLifebanksRoute = require('./get-valid-lifebanks/get-valid-lifebanks.route')
const checkSignupMethod = require('./signup-method/signup-method.route')
const getReport = require('./get-report/get-report.route')
const redeemOffer = require('./redeem-offer/redeem-offer.route')
const checkEmailVerified = require('./check-email-verified/check-email-verified.route')
const donate = require('./donate/donate.route')
const closeAccount = require('./close-account/close-account.route')
const reopenAccount = require('./reopen-account/reopen-account.route')
const addOffer = require('./add-offer/add-offer.route')
const removeOffer = require('./remove-offer/remove-offer.route')

module.exports = [
  changePasswordRoute,
  changeEmailRoute,
  checkUsernameRoute,
  createAccountRoute,
  createAccountAuthRoute,
  credentialsRecoveryRoute,
  editProfileRoute,
  editNotificationStateRoute,
  getcontractRoute,
  getValidSponsorsRoute,
  grantConsentRoute,
  loginRoute,
  sendEmailRoute,
  profileRoute,
  revokeConsentRoute,
  signupRoute,
  transferRoute,
  preregisterLifebankRoute,
  registerLifebankRoute,
  verifyEmailRouteRoute,
  getValidLifebanksRoute,
  checkSignupMethod,
  getReport,
  redeemOffer,
  checkEmailVerified,
  donate,
  closeAccount,
  reopenAccount,
  addOffer,
  removeOffer
]
