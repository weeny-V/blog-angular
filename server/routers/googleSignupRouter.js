const express = require('express');
const passportSign = require('passport')
require('../authMethods/google/signupGoogle')(passportSign);

const router = express.Router();

router.get('/google', passportSign.authenticate('google-signup', { scope: [ 'email', 'profile' ] }));

router.get('/google/callback', passportSign.authenticate('google-signup', { session: false }),
  (req, res) => {
    const { name, surname, email, method } = req.user;
    const url = 'http://localhost:4200/sign-up';

    if (req.user.alreadyExist) {
      return res.redirect('/account/exist')
    }

    return res.redirect(`${url}?email=${email}&name=${name}&surname=${surname}&method=${method}`);
  })

module.exports = {
  googleSignupRouter: router,
}
