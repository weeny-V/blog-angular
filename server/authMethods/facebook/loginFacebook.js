const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../models/Users');
require('dotenv').config();

module.exports = (passport) => {
  passport.use('facebook-login', new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/facebook/login/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ facebookID: profile.id });

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false)
      }
    }
  ));
}
