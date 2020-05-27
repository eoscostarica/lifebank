const Joi = require('@hapi/joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      sponsor: Joi.object({
        sponsorName: Joi.string().required(),
        covidImpact: Joi.string().required(),
        benefitDescription: Joi.string().required(),
        website: Joi.string().required(),
        telephone: Joi.string().required(),
        bussinesType: Joi.string().required(),
        schedule: Joi.string().required(),
        geolocation: Joi.object({
          latitude: Joi.number().required(),
          longitude: Joi.number().required()
        })
      })
    })
  }).options({ stripUnknown: true })
}
