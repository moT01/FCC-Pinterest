import express from 'express';
import axios from 'axios';
import { without } from 'lodash';
import postsModel from '../models/postsModel';
import isImageURL from 'is-image-url';

let fetch = require('node-fetch');
let router = express.Router();

router.get('/allPosts', (req, res) => {

});


router.get('/usersPosts/:username', (req, res) => {

});


router.get('/myPins/:username', (req, res) => {

});


router.post('/createPost', (req, res) => {
  const { imageURL, userID, username } = req.body;
  let message = {'messageType': 'error', 'messageMessage': 'Could not add image'};

  async function createPost() {
    var newPost = new postsModel({
      postedBy: username,
      imageURL: imageURL
    });

    newPost.save().then(() => {
      message = {'messageType': 'success', 'messageMessage': 'Added successfully'};
	   res.send([message]);
    }).catch(e => {
      res.send([message]);
	 });
  }

  if(isImageURL(imageURL)) {       
    createPost();
  }
  
  res.send([message]);
});


router.patch('/deletePost/:id', (req, res) => {

});

export default router;
