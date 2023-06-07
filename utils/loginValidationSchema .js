const Joi = require("joi");
const createUserValidasionSchema = require("./authValidationSchema");

const loginValidationSchema = Joi.object({
  email: createUserValidasionSchema.extract("email"),
  password: createUserValidasionSchema.extract("password"),
});

module.exports = loginValidationSchema;
