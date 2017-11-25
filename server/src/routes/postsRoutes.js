import express from 'express';
import axios from 'axios';
import { without } from 'lodash';
import postsModel from '../models/postsModel';

let fetch = require('node-fetch');
let router = express.Router();

router.get('/allPosts', (req, res) => {

});


router.get('/usersPosts/:username', (req, res) => {

});


router.get('/myPins/:username', (req, res) => {

});


router.post('/createPost', (req, res) => {
  console.log('createpost');
  const { imageURL, userID, username } = req.body;
  console.log(imageURL);
  console.log(userID);
  console.log(username);
  async function createPost() {
    var newPost = new postsModel({
      postedBy: username,
      imageURL: imageURL
    });
    console.log('save post');
    //newPost.save();
    
    res.json({'hi':'hi'});
  }
  
  createPost();
});


router.patch('/deletePost/:id', (req, res) => {

});

export default router;
