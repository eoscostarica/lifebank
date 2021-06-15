const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      offer_id: Joi.number().required()
    })
  }).options({ stripUnknown: true })
}
