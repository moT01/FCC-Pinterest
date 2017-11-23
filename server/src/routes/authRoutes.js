import express from 'express';
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import passport from 'passport';

let router = express.Router();

//router.get('/twitterLogin', passport.authenticate('twitter'));

//this route is temporary - just so i can console.log something
//will change it to above one when this is working
router.get('/twitterLogin', function(req, res, next) {
  console.log( "'/twitterLogin'");
  return passport.authenticate('twitter')(req, res, next);
});

//see docs for 'successRedirect'
router.get('/twitterReturn', passport.authenticate('twitter', {
  failureRedirect: 'http://localhost:3000',
  successRedirect: 'http://localhost:8080/api/auth/profile'
}), (req, res) => {
  console.log("'/twitterReturn'");
  return res.json({'user':req.user})
});

router.get('/profile', function(req, res, next) {
  console.log(req.user);

  res.redirect('localhost:3000/profile');
});

export default router;
