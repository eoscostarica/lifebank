const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      limited: Joi.boolean().required(),
      online_only: Joi.boolean().required(),
      quantity: Joi.number().required(),
      offer_type: Joi.string().required(),
      description: Joi.string().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string().required(),
      images: Joi.string().required(),
      sponsor_id: Joi.number().required(),
      active: Joi.boolean().required(),
      offer_name: Joi.string().required(),
      cost_in_tokens: Joi.number().required(),
      icon: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}
