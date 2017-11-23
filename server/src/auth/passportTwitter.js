import passport from 'passport';
import { Strategy } from 'passport-twitter';
import userModel from '../models/userModel';
import { ObjectID } from 'mongodb';

module.exports = function() {
  passport.serializeUser(function(user, done) {
    console.log('serialize ' + user.id);
	 done(null, user.id);
  });
	
  passport.deserializeUser(function(obj, done) {
    console.log('deserialize ' + obj);

    userModel.find({ '_id' : ObjectID(obj) }).then(user => {
    	console.log('deserializered');
      done(null, user);
    });
  });
	
  passport.use(new Strategy({
	 consumerKey: process.env.TWITTER_KEY,
	 consumerSecret: process.env.TWITTER_SECRET,
	 callbackURL: "api/auth/twitterReturn"
  }, function(token, tokenSecret, profile, done) {
  	
    userModel.findOne({ username : profile.username }).then(currentUser => {

      if(currentUser) {
        console.log('twitter user found in our db');
        done(null, currentUser);
      } else {
     
        new userModel({
          username:profile.username
        }).save().then(newUser => {
        	 console.log('new user created: '+newUser);
          done(null, newUser);
        });
      }      
    });
 }));
};
