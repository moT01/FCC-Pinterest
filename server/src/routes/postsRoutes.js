import express from 'express';
import axios from 'axios';
import { without } from 'lodash';
import postsModel from '../models/postsModel';
import isImageURL from 'is-image-url';

let fetch = require('node-fetch');
let router = express.Router();

router.get('/allPosts', (req, res) => {
	console.log('/allPosts');
   postsModel.find().then(allPosts => {
     res.send(allPosts) 
   }).catch(err => {
     res.send([err])
   });
});


router.get('/usersPosts/:userID', (req, res) => {

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
  } else {
    res.send([message]);
  }
});


router.patch('/deletePost', (req, res) => {
  console.log('/delete');
  const { postID, postOwner, authenticatedUsername } = req.body;
  let message = { 'messageType': 'error', 'messageMessage': 'Could not delete post' };

  async function deletePost(){
    if(postOwner === authenticatedUsername) {
      postsModel.remove({_id:postID}).then(() => {
		  postsModel.find().then(allPosts => {
		  	 message = {'messageType': 'error', 'messageMessage': 'Post deleted'};
		    res.send([allPosts, message]);
		  }).catch(err => {
	       message = {'messageType': 'error', 'messageMessage': 'server error'};
	       res.send([[err], message]);
		  });
	   });
    }
  }

  deletePost();
});

export default router;
