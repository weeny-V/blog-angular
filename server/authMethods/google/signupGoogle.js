const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../../models/Users');
require('dotenv').config();

module.exports = (passport) => {
  passport.use('google-signup', new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/signup/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const existed = await User.findOne({ email: profile.email })

        if (existed) {
          return done(null, { alreadyExist: true })
        }

        return done(null, {
          email: profile.email,
          surname: profile.name.familyName,
          name: profile.name.givenName,
          method: 'google'
        });
      } catch (error) {
        return done(error, false)
      }
    }
  ));
}
