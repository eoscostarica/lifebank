const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')
const {tweet} = require('../../twitterBot/statusesUpdate')

module.exports = async ({ payload: { input } }) => {
  try {
    const response = await accountApi.login(input)
    tweet('Hello World, Twit2','https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')
    return response
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
