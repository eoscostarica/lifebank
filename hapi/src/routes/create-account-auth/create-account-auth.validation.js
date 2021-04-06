const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      role: Joi.string().required(),
      email: Joi.string().required(),
      emailContent: Joi.object().required(),
      name: Joi.string().required(),
      secret: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
