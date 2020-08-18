const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      to: Joi.string().required(),
      memo: Joi.string().required(),
      quantity: Joi.number().optional()
    })
  }).options({ stripUnknown: true })
}
