const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../../models/Users');
require('dotenv').config();

module.exports = (passport) => {
  passport.use('google-login', new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.email });

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
