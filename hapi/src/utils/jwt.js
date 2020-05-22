const nJwt = require('njwt')

const { jwtConfig } = require('../config')

const create = ({ account, type, ...args }) => {
  const jwt = nJwt.create(
    {
      ...args,
      iss: jwtConfig.iss,
      sub: account,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [type],
        'x-hasura-default-role': type
      }
    },
    jwtConfig.secret,
    'HS256'
  )
  jwt.setExpiration(new Date().getTime() + 8 * 60 * 60 * 1000)

  return jwt.compact()
}

const auth = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: jwtConfig.secret,
    validate: async () => ({
      isValid: true
    }),
    verifyOptions: {
      algorithms: ['HS256'],
      issuer: jwtConfig.iss
    }
  })

  server.auth.default('jwt')
}

module.exports = {
  create,
  auth
}
