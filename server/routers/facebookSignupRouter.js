const express = require('express');
const passportSign = require('passport')
require('../authMethods/facebook/signupFacebook')(passportSign);

const router = express.Router();

router.get('/', passportSign.authenticate('facebook-signup'));

router.get('/callback', passportSign.authenticate('facebook-signup', { session: false }),
  (req, res) => {
    const { id, name, surname, email, method } = req.user;
    const url = 'http://localhost:4200/sign-up';

    if (req.user.alreadyExist) {
      return res.redirect('/account/exist')
    }

    return res.redirect(`${url}?email=${email}&name=${name}&surname=${surname}&method=${method}&id=${id}`);
  })

module.exports = {
  facebookSignupRouter: router,
}
