import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import postsRoutes from './routes/postsRoutes';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
//import cookieParser from 'cookie-parser';
import passportTwitter from './auth/passportTwitter';

passportTwitter();

require('dotenv').config();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pinterest1', { useMongoClient: true });

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use(cors(corsOption));
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(port, () => console.log('Running on port: ' + port));

//setup cors
// var corsOption = {
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   exposedHeaders: ['jwtToken']
// };

//app.use(cookieParser());
// app.use(session({
// 	secret: process.env.SESSION_SECRET,
// 	cookie: {
//      maxAge : 10000,
// 	  secure: false
// 	},
// 	resave: true,
// 	saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// require( './auth/passportTwitter')();

//app.use(express.static(path.join(__dirname, 'public')));
