import axios from 'axios';
import { GET_USER_POSTS, GET_MY_POSTS, LOAD_POSTS, CREATE_POST, DELETE_POST, PIN_POST, MY_PINS } from './types';


// getting other user's posts and dispatching to store
export function loadUserPosts(posts) {
  return {
    type: GET_USER_POSTS,
    posts
  };
}

export function getUserPosts(id) {
  console.log('getUserPosts action');
  return dispatch => {
    return axios.patch('/api/posts/getUserPosts', {id}).then(res => {
      const myPosts = res.data;
      console.log("myPosts" + myPosts);
      dispatch(loadUserPosts(myPosts));
    });
  }
}

// getting all recent user posts and dispatching to store
export function loadAllPosts(postsToDisplay) {
  return {
    type: LOAD_POSTS,
    postsToDisplay
  };
}

export function getAllPosts(data) {
  console.log('getAllPosts action');
  return dispatch => {
    return axios.get('/api/posts/allPosts', data).then(res => {
      const allPosts = res.data;
      console.log("allPosts" + res.data);
      dispatch(loadAllPosts(allPosts));
    });
  }
}

// getting the logged in user posts and dispatching to store
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
      const myPosts = res.data;
      console.log("myPosts" + myPosts);
      dispatch(loadMyPosts(myPosts));
    });
  }
}

// adding new a post and dispatching to store
export function AddNewPost(post) {
  return {
    type: CREATE_POST,
    post
  };
}

export function createPost(data) {
  console.log('createPost action');
  console.log(data);
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log(res.data.post);
      const newPost = (res.data.post);

      dispatch(AddNewPost(newPost));
    });
  }
}

// deleting posts and dispatching to store
export function postToUpdateOrDelete(post) {
  return {
    type: DELETE_POST,
    post
  };
}

export function deletePost(postID, postOwnerID, authenticatedUserID) {
  console.log('deletePost action');
  return dispatch => {
    return axios.patch('/api/posts/deletePost', { postID, postOwnerID, authenticatedUserID }).then(res => {
      const post = res.data[0];
      dispatch(postToUpdateOrDelete(post));
    });
  }
}

// deleting posts and dispatching to store
export function loadMyPins(myPins) {
  return {
    type: MY_PINS,
    myPins
  };
}

export function getMyPins(userID) {
  console.log('getMyPins action');
  return dispatch => {
    return axios.patch('/api/posts/getPins', { userID }).then(res => {
      console.log('getMyPins action.then');
      const myPins = res.data.myPins;
      dispatch(loadMyPins(myPins));
    });
  }
}

export function postToPin(updatedPost) {
  return {
    type: PIN_POST,
    updatedPost
  };
}

export function pinPost(postID, userID) {
  console.log('pin post action');
  console.log(postID, userID);
  return dispatch => {
    return axios.patch('/api/posts/pinPost', { postID, userID }).then(res => {
      console.log('pinPost action.then');
      const updatedPost = res.data.post;
      console.log(updatedPost);
      dispatch(postToPin(updatedPost));
    });
  }
}

export function unpinPost(postID, userID) {
  console.log('unpin post action');
  return dispatch => {
    return axios.patch('/api/posts/unpinPost', { postID, userID }).then(res => {
      console.log('unpin action.then');
      const post = res.data[0];
      dispatch(postToUpdateOrDelete(post));
    });
  }
}
