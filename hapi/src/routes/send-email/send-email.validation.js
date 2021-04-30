const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      account: Joi.string().required(),
      emailContent: Joi.object().required()
    })
  }).options({ stripUnknown: true })
}
