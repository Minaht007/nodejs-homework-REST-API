const joi = require("joi");

const Schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateFavoretSchema = joi.object({
  favorite: joi.boolean().required(),
});

// const emailShema = joi.object({
//   email: joi.string().required(),
// });

module.exports = { Schema, updateFavoretSchema };
