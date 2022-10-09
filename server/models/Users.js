const mongoose = require('mongoose');
const Joi = require('joi');

const UsersJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

  surname: Joi.string(),

  name: Joi.string(),
});

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },
  facebookID: {
    type:String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  createdDate: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  UsersJoiSchema,
};
