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


router.patch('/getUserPosts', (req, res) => {
  console.log('/getUserPosts');
  const { username } = req.body;

  postsModel.find({ "postedBy": username }).then(usersPosts => {
    res.send(usersPosts);
  }).catch(err => {
    res.send([err])
  });
});


router.patch('/getPins', (req, res) => {
  console.log('/getPins');
  const { username } = req.body;

  //not written yet
  postsModel.find().then(allPosts => {
  console.log(allPosts);
    res.send(allPosts)

  }).catch(err => {
    res.send([err])
  });
});


router.post('/createPost', (req, res) => {
  const { imageURL, userID} = req.body;
  let message = {'type': 'error', 'content': 'Could not add image'};

  async function createPost() {
    var newPost = new postsModel({
      postedBy: userID,
      imageURL: imageURL
    });

    newPost.save().then(() => {
    	message.type = 'success';
      message.content = 'holly molly';
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
  let message = { 'type': 'error', 'content': 'Could not delete post' };

  async function deletePost(){
    if(postOwner === authenticatedUsername) {
      postsModel.remove({_id:postID}).then(() => {
		  postsModel.find().then(allPosts => {
		  	 message.content = 'Post deleted';
		    res.send([allPosts, message]);
		  }).catch(err => {
	       message.content = 'server error';
	       res.send([[err], message]);
		  });
	   });
    }
  }

  deletePost();
});


router.post('/pinPost', (req, res) => {
  console.log('/pinPost');
  const { postID, username } = req.body;
  console.log(postID);
  console.log(username);

  let message = { 'type': 'error', 'content': 'Could not pin post' };

  async function pinPost() {
	 postsModel.findOne({ "_id": postID }, (err, post) => {
	   if (err) {
	     message.content = 'Could not find post';
	     res.send([message]);
	   }

	   post.pinnedBy.push(username);
	   post.save().then(() => {
        message.type = 'success';
        message.content = 'pinned';
        res.send([message]);
	   }).catch(e => {
        message.type = 'error';
        message.content = 'server error';
        res.send([message]);
	   });
    });
  }

  pinPost();
});


router.patch('/unpinPost', (req, res) => {
  console.log('/unpinPost');
  const { postID, username } = req.body;

  //so in here i need to remove username from postID:pinnedBy
  //and return a flash message -> see delete route

  postsModel.find().then(allPosts => {
  console.log(allPosts);
    res.send(allPosts)

  }).catch(err => {
    res.send([err])
  });
});

export default router;
