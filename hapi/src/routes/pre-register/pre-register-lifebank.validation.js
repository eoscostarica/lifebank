const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      schedule: Joi.string().required(),
      phone: Joi.string().required(),
      description: Joi.string(),
      urgency_level: Joi.number(),
      coordinates: Joi.string().required(),
      immunity_test: Joi.boolean(),
      invitation_code: Joi.string()
    })
  }).options({ stripUnknown: true })
}
