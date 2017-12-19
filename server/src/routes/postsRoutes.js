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

  const { id } = req.body;
	console.log(id);
  postsModel.find({ 'postedBy': id }).then(userPosts => {
		console.log("posts: " + userPosts);
    res.send(userPosts);
  }).catch(err => {
		console.log(err);
    res.send([err]);
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

    newPost.save().then( post => {
			console.log(post);
    	message.type = 'success';
      message.content = 'holly molly';
	   res.send({message, post});
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
  const { postID, postOwnerID, authenticatedUserID } = req.body;
  console.log(postID);
  
  async function deletePost(){

    if(postOwnerID === authenticatedUserID) {      

      postsModel.findOne({ "_id": postID }, (err, post) => {
	     if (err) {
	       res.send(err);
	     }
        
        //if someone pinned it - remove the owner from the post
        if(post.pinnedBy.length > 0) {
          post.postedBy = null;
          post.save().then(() => {
            res.send([ post ]);
	       }).catch(e => {
            res.send([e]);
	       });
	       
        //if nobody pinned - remove the whole post
        } else {
          postsModel.remove({_id:postID}).then(() => {
		      res.send([ postID ]);
		    }).catch(err => {
	         res.send([err]);
	    	 });
        }
      });
    }
  }

  deletePost();
});


router.patch('/pinPost', (req, res) => {
  console.log('/pinPost');
  const { postID, userID } = req.body;
  console.log(postID);
  console.log(userID);

  async function pinPost() {
	 postsModel.findOne({ "_id": postID }, (err, post) => {
	   if (err) {
	     res.send(err);
	   }

	   post.pinnedBy.push(userID);
	   post.save().then(() => {
        res.send({ post });
	   }).catch(e => {
        res.send(e);
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
