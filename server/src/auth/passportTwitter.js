import passport from 'passport';
import { Strategy } from 'passport-twitter';
import userModel from '../models/userModel';
//import { ObjectID } from 'mongodb';

import TwitterTokenStrategy from 'passport-twitter-token';

module.exports = function () {
  console.log("TWITTER_KEY"+process.env.TWITTER_KEY);
  passport.use(new TwitterTokenStrategy({
      consumerKey: "DzJf3HeZWfjJkIkq4RDnV8PiY",
      consumerSecret: "WQYGbtpGAJMKt8zVurXom1x5Zj3A8JL0n5xmjj3V8O0ed4VqhO",
      includeEmail: true
    },
    function (token, tokenSecret, profile, done) {
      userModel.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));
};

//  //create a cookie to send to the browser
//  passport.serializeUser(function(user, done) {
//  done(null, user.id);
//  });
//
//  //decode the cookie on each subsequent request to the server
//  passport.deserializeUser(function(obj, done) {
//    userModel.find({ '_id' : ObjectID(obj) }).then(user => {
//      done(null, user);
//    });
//  });
//
//  passport.use(new Strategy({
//  consumerKey: process.env.TWITTER_KEY,
//  consumerSecret: process.env.TWITTER_SECRET,
//  callbackURL: "api/auth/twitterReturn"
//  }, function(token, tokenSecret, profile, done) {
//
//    userModel.findOne({ username : profile.username }).then(currentUser => {
//
//      if(currentUser) {
//        console.log('twitter user found in our db');
//        done(null, currentUser);
//      } else {
//
//        new userModel({
//          username:profile.username
//        }).save().then(newUser => {
//        	 console.log('new user created: '+newUser);
//          done(null, newUser);
//        });
//      }
//    });
// }));
