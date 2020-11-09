const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      secret: Joi.string().required(),
      verification_code: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
