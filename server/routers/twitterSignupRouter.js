const express = require('express');
const passportSign = require('passport')
require('../authMethods/twitter/signupTwitter')(passportSign);

const router = express.Router();

router.get('/', passportSign.authenticate('twitter-signup', { scope: [ 'email', 'profile' ] }));

router.get('/callback', passportSign.authenticate('twitter-signup', { session: true }),
  (req, res) => {
    const { name, surname, email, method } = req.user;
    const url = 'http://localhost:4200/sign-up';

    if (req.user.alreadyExist) {
      return res.redirect('/account/exist')
    }

    return res.redirect(`${url}?email=${email}&name=${name}&surname=${surname}&method=${method}`);
  })

module.exports = {
  twitterSignupRouter: router,
}
