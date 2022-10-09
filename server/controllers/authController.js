const { saveUser } = require('../services/authService');
const { UsersJoiSchema, User } = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = LocalStorage('./server/localeStorage/auth');

const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, surname, method, id } = req.body;
    if (!email || !password || !name || !surname) {
      return res.status(400).send({
        message: 'Specify all require parameters email, password, name and surname',
      });
    }

    await saveUser({
      email, surname, name, method, password, id,
    });

    return res.status(200).send({
      message: 'Profile created successfully',
      status: 200,
    });
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(400).send({
        message: 'User with this email already exist'
      })
    }

    return next(err);
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  UsersJoiSchema.validate({ email: req.body.email, password: req.body.password });
  if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
    const payload = {
      email: user.email,
      userId: user._id,
      surname: user.surname,
      createdDate: user.createdDate,
      name: user.name,
      facebookID: user.facebookID,
      method: user.method,
    };
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);
    if (typeof localStorage === "undefined" || localStorage === null) {
      localStorage = new LocalStorage('./server/localeStorage/auth');
    }

    localStorage.setItem('jwt_token', jwtToken);
    return res.status(200).send({
      jwt_token: jwtToken,
      status: 200,
    });
  }
  return res.status(403).json({ message: 'Not authorized' });
};

const getToken = (req, res) => {
  const jwt_token = localStorage.getItem('jwt_token');

  if (!jwt_token) {
    return res.status(400).send({
      message: 'Token does not exist',
      status: 400,
    });
  }

  return res.status(200).send({
    message: 'Token successfully sent',
    jwt_token,
    status: 200,
  })
};

const logout = (req, res) => {
  localStorage.removeItem('jwt_token');

  return res.status(200).send({
    message: 'Successfully log out',
    status: 200,
  })
};

module.exports = {
  registerUser,
  loginUser,
  getToken,
  logout,
}
