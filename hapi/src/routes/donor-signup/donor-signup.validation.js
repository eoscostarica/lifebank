const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      fullname: Joi.string().required(),
      secret: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
