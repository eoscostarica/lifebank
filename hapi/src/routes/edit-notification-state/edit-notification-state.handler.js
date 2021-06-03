const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { donorApi, sponsorApi, lifebankApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    const role =
      credentials['https://hasura.io/jwt/claims']['x-hasura-default-role']

    console.log('ID', input)
    console.log('CREDENTIALS', credentials.sub)
    await donorApi.editNotificationState(credentials.sub, input.id)
    // switch (role) {
    //   case 'donor':
    //     await donorApi.editNotificationState(credentials.sub, input.id)
    //     break
    //   /* case 'sponsor':
    //      await sponsorApi.editProfile(credentials.sub, input.profile)
    //      break
    //    case 'lifebank':
    //      await lifebankApi.editProfile(credentials.sub, input.profile)
    //      break
    //    default:
    //      throw new Error('Invalid role')
    //      break*/
    // }

    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
