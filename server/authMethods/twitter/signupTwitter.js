const TwitterStrategy = require('passport-twitter').Strategy;
const { User } = require('../../models/Users');
require('dotenv').config();

module.exports = (passport) => {
  passport.use('twitter-signup', new TwitterStrategy({
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      callbackURL: 'http://localhost:3000/twitter/signup/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        console.log(profile.email);
        const existed = await User.findOne({ email: profile.email })

        if (existed) {
          return done(null, { alreadyExist: true })
        }

        return done(null, {
          email: profile.email,
          // surname: profile.name.familyName,
          // name: profile.name.givenName,
          method: 'twitter'
        });
      } catch (error) {
        return done(error, false)
      }
    }
  ));
}
