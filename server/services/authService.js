const bcryptjs = require('bcryptjs');
const { User, UsersJoiSchema } = require('../models/Users');

const saveUser = async ({ email, surname, name, method, password, id }) => {
  UsersJoiSchema.validate({
    name, email, surname,
  });

  const user = new User({
    method,
    name,
    email,
    password: await bcryptjs.hash(password, 10),
    surname,
    createdDate: new Date(),
    facebookID: id || null,
  });

  return await user.save();
};

module.exports = {
  saveUser,
};

