const mongoose = require("mongoose");
const Joi = require("joi");
// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Model
const Users = new mongoose.model("users", userSchema);
// Validation
function userValidation(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    avatar: Joi.string()
  };
  return Joi.validate(user, schema);
}
exports.Users = Users;
exports.Validate = userValidation;
