import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import postsRoutes from './routes/postsRoutes';
import session from 'express-session';
import passport from 'passport';

require('dotenv').config();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pinterest', { useMongoClient: true });

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
	secret: 'whatever',
	resave: true, 
	saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())

require( './auth/passportTwitter')();

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(port, () => console.log('Running on port: ' + port));
