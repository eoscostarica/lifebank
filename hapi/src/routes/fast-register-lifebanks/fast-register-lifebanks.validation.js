const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      lifebanks: Joi.object().required()
    })
  }).options({ stripUnknown: true })
}
