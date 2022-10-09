const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../models/Users');
require('dotenv').config();

module.exports = (passport) => {
  passport.use('facebook-signup', new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/facebook/signup/callback',
      profileFields: ['emails', 'displayName'],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const existed = await User.findOne({ facebookID: profile.id })

        if (existed) {
          return done(null, { alreadyExist: true })
        }

        const name = profile.displayName.split(' ')[0];
        const surname = profile.displayName.split(' ')[1];

        return done(null, {
          id: profile.id,
          email: profile.email,
          surname: surname,
          name: name,
          method: 'facebook'
        });
      } catch (error) {
        return done(error, false)
      }
    }
  ));
}
