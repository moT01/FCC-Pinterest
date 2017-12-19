import passport from 'passport';
import { Strategy } from 'passport-twitter';
import userModel from '../models/userModel';

//passport strategy that uses jwt
import TwitterTokenStrategy from 'passport-twitter-token';

//strategy config
module.exports = function () {
  passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
      userModel.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));
};
