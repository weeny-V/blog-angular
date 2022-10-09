const express = require('express');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
let localeStorage = LocalStorage('./server/localeStorage/auth');
require('../authMethods/google/loginGoogle')(passport);
require('dotenv').config();

const router = express.Router();

router.get('/google', passport.authenticate('google-login', { scope: [ 'email', 'profile' ] }));

router.get('/google/callback', passport.authenticate('google-login', { session: false, failureRedirect: '/success' }),
  (req, res) => {
    jwt.sign(
      {
        email: req.user.email,
        userId: req.user._id,
        surname: req.user.surname,
        createdDate: req.user.createdDate,
        name: req.user.name,
        facebookID: req.user.facebookID,
        method: req.user.method,
      },
      process.env.SECRET_KEY, { },
      (err, token) => {
        if (err) {
          return res.json({
            jwt_token: null,
          });
        }
        if (typeof localStorage === "undefined" || localStorage === null) {
          localStorage = new LocalStorage('./server/localeStorage/auth');
        }

        localStorage.setItem('jwt_token', token);
        res.redirect('http://localhost:4200')
      }
    );
  })

module.exports = {
  googleLoginRouter: router,
}
