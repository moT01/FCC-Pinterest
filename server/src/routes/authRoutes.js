import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import expressJwt from 'express-jwt';
import request from 'request';
require('dotenv').config();



let router = express.Router();

var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, process.env.JWT_SECRET,
  {
    expiresIn: 60 * 120
  });
};


var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  return next();
};


var sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

//authenticating user on each call to the api
var authenticate = expressJwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});


/*this end point handles sending request token from client to twitter and sending it back to client*/

router.route('/twitter/reverse')
  .post(function(req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET
      }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: e.message });
      }

      var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });


/*this end point handels sending verification code from client to twitter and getting access token
 from twitter and making jwt and sending it back to client*/

router.route('/twitter')
  .post((req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: 'KEY',
        consumer_secret: 'SECRET',
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      console.log(body);
      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
      if (!req.user) {
        return res.send(401, 'User Not Authenticated');
      }
      // prepare token for API
      req.auth = {
        id: req.user.id
      };

      return next();
}, generateToken, sendToken);

export default router;


// router.get('/login', function(req, res, next) {
//   console.log('/login');
//   console.log(req.user);
//   if (req.user){
//     const token = jwt.sign({
//       id: req.user[0]._id,
//       username: req.user[0].username
//        }, process.env.JWT_SECRET);
//        console.log('token created');
//        res.json({token});
//    } else {
//      res.redirect('http://localhost:3000');
//    }
// });
