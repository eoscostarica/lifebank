const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      email: Joi.string().required(),
      emailContent: Joi.object().required(),
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
