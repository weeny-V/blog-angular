const express = require('express');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
let localeStorage = LocalStorage('./server/localeStorage/auth');
require('../authMethods/facebook/loginFacebook')(passport);

const router = express.Router();

router.get('/', passport.authenticate('facebook-login'));

router.get('/callback', passport.authenticate('facebook-login', { session: false, failureRedirect: '/success' }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      'secretKey', {},
      (err, token) => {
        if (err) {
          return res.json({
            jwt_token: null,
          });
        }
        if (typeof localStorage === 'undefined' || localStorage === null) {
          localStorage = new LocalStorage('./server/localeStorage/auth');
        }

        localStorage.setItem('jwt_token', token);
        res.redirect('http://localhost:4200')
      }
    );
  })

module.exports = {
  facebookLoginRouter: router,
}
