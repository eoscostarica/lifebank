const nJwt = require('njwt')

const { jwtConfig } = require('../config')

const create = ({ account, role, ...args }) => {
  const jwt = nJwt.create(
    {
      ...args,
      iss: jwtConfig.iss,
      sub: account,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [role],
        'x-hasura-default-role': role,
        'X-Hasura-User-Id': account
      }
    },
    jwtConfig.secret,
    'HS256'
  )
  jwt.setExpiration(new Date().getTime() + 30)

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
