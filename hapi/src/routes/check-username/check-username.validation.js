const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      role: Joi.string().required(),
      username: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
