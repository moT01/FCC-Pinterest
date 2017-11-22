import passport from 'passport';
import { Strategy } from 'passport-twitter';

module.exports = function() {
	passport.serializeUser(function(user, callback) {
	  console.log('passportTwitter.js -serialize');
	  callback(null, user);
	});
	
	passport.deserializeUser(function(obj, callback) {
	  console.log('passportTwitter.js -deserialize');
	  callback(null, obj);
	});
	
	passport.use(new Strategy({
	  consumerKey: process.env.TWITTER_KEY,
	  consumerSecret: process.env.TWITTER_SECRET,
	  callbackURL: "api/auth/twitterReturn"
	}, function(token, tokenSecret, profile, callback) {
	  console.log('passportTwitter.js -token = ' + token);
	  console.log('passportTwitter.js -tokenSecret = ' + tokenSecret);

	  console.log('passportTwitter.js -profile.username = ' + profile.username);
	  return callback(null, profile);
	}));
};