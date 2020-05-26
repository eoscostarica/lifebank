const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      address: Joi.string().required(),
      location: Joi.string().required(),
      phone_number: Joi.string().required(),
      has_immunity_test: Joi.boolean().required(),
      blood_urgency_level: Joi.number().required(),
      schedule: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
