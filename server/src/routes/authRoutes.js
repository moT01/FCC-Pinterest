import express from 'express';
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import passport from 'passport';

let router = express.Router();

//router.get('/twitterLogin', passport.authenticate('twitter'));

//this route is temporary - just so i can console.log something
//will change it to above one when this is working
router.get('/twitterLogin', function(req, res, next) {
  console.log( "auth.js '/twitterLogin'");
  return passport.authenticate('twitter')(req, res, next);
});

//see docs for 'successRedirect'
router.get('/twitterReturn', passport.authenticate('twitter', {
  failureRedirect: '/'
}), (req, res) => {
  console.log("auth.js '/twitterReturn'");
  return res.json({'hello':'world'})
});

export default router;
