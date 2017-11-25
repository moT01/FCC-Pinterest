import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

let router = express.Router();

router.get('/twitterLogin', passport.authenticate('twitter'));

router.get('/twitterReturn', passport.authenticate('twitter', {
  failureRedirect: 'http://localhost:3000',
  successRedirect: 'http://localhost:3000'
}));

router.get('/login', function(req, res, next) {
  console.log('/login');
  console.log(req.user);
  if (req.user){
    const token = jwt.sign({
      id: req.user[0]._id,
      username: req.user[0].username
       }, process.env.JWT_SECRET);
       console.log('token created');
       res.json({token});
   } else {
     res.redirect('http://localhost:3000');
   }
});

export default router;
