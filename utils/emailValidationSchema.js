const Joi = require("joi");

const emailShema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});

module.exports = emailShema;
