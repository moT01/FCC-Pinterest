require('dotenv').config();


import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import postsRoutes from './routes/postsRoutes';
import passport from 'passport';
import cors from 'cors';
import passportTwitter from './auth/passportTwitter';

passportTwitter();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pinter', { useMongoClient: true });

let app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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
