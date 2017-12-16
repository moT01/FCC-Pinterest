import axios from 'axios';
import { GET_MY_POSTS,LOAD_POSTS, CREATE_POST, DELETE_POST } from './types';

export function loadPosts(postsToDisplay) {
  return {
    type: LOAD_POSTS,
    postsToDisplay
  };
}

export function getAllPosts(data) {
  console.log('getAllPosts action');
  return dispatch => {
    return axios.get('/api/posts/allPosts', data).then(res => {
      //console.log('getAllPosts action.then');
      const allPosts = res.data;
      console.log("allPosts" + res.data);
      dispatch(loadPosts(allPosts));
    });
  }
}

export function loadMyPosts(posts) {
  return {
    type: GET_MY_POSTS,
    posts
  };
}

export function getMyPosts(id) {
  console.log('getUserPosts action');
  return dispatch => {
    return axios.patch('/api/posts/getUserPosts', {id}).then(res => {
      //console.log('getUserPosts action.then');
      const myPosts = res.data;
      console.log("myPosts" + myPosts);
      dispatch(loadMyPosts(myPosts));
    });
  }
}

export function AddNewPost(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function postToDelete(postID) {
  return {
    type: DELETE_POST,
    postID
  };
}



export function deletePost(postID, postOwnerID, authenticatedUserID) {
  console.log('deletePost action');

  return dispatch => {
    return axios.patch('/api/posts/deletePost', { postID, postOwnerID, authenticatedUserID }).then(res => {
      console.log('deletePost action.then => dispatch');
      const postID = res.data[0];
      dispatch(postToDelete(postID));
    });
  }
}


export function createPost(data) {
  console.log('createPost action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('createPost action.then');
      console.log(res.data.post);
      const newPost = (res.data.post);

      dispatch(AddNewPost(newPost));
    });
  }
}



export function getMyPins(username) {
  console.log('getMyPins action');
  console.log(username);
  return dispatch => {
    return axios.patch('/api/posts/getPins', { username }).then(res => {
      console.log('getMyPins action.then');
      const myPins = res.data;
      dispatch(loadPosts(myPins));
    });
  }
}

export function pinPost(postID, username) {
  console.log('pin post action');
  console.log(postID, username);
  return dispatch => {
    return axios.post('/api/posts/pinPost', { postID, username}).then(res => {
      console.log('pinPost action.then');
      console.log(res.data[0]);
      //const message = res.data[0];
      //dispatch(addFlashMessage(message));
    });
  }
}

export function unpinPost(data) {
  console.log('unpin post action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('unpin action.then');
      console.log(res.data[0]);
      //const message = res.data[0];
      //dispatch(addFlashMessage(message));
    });
  }
}
