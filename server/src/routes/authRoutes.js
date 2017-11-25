import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

let router = express.Router();

router.get('/twitterLogin', passport.authenticate('twitter'));

router.get('/twitterReturn', passport.authenticate('twitter', {
  failureRedirect: 'http://localhost:3000',
  successRedirect: 'http://localhost:3000/login'
}));

router.get('/login', function(req, res, next) {
  if (req.user.length > 0){
    const token = jwt.sign({
      id: req.user._id,
      username: req.user.username
       }, process.env.JWT_SECRET);
       res.json({token});
   } else {
     res.redirect('http://localhost:3000');
   }
});

export default router;
