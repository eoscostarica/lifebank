const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      description: Joi.object().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      schedule: Joi.string().required(),
      image: Joi.string().required(),
    })
  }).options({ stripUnknown: true })
}
