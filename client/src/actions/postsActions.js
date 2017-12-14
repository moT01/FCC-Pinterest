import axios from 'axios';

export function loadPosts(postsToDisplay) {
  return {
    type: 'LOAD_POSTS',
    postsToDisplay
  };
}

export function postsPlusMessage(postsToDisplay, message) {
  return {
    type: 'POSTS_AND_MESSAGE',
    postsToDisplay,
    message
  };
}

export function addFlashMessage(message) {
  return {
    type: 'ADD_FLASH',
    message
  };
}

export function getAllPosts(data) {
  console.log('getAllPosts action');
  return dispatch => {
    return axios.get('/api/posts/allPosts', data).then(res => {
      console.log('getAllPosts action.then');
      const allPosts = res.data;
      dispatch(loadPosts(allPosts));
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

export function getUserPosts(username) {
  console.log('getUserPosts action');
  return dispatch => {
    return axios.patch('/api/posts/getUserPosts', { username }).then(res => {
      console.log('getUserPosts action.then');
      const userPosts = res.data;
      dispatch(loadPosts(userPosts));
    });
  }
}

export function createPost(data) {
  console.log('createPost action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('createPost action.then');
      // const message = res.data[0];
      // dispatch(addFlashMessage(message));
    });
  }
}

export function deletePost(postID, postOwner, authenticatedUsername) {
  console.log('deletePost action');
  return dispatch => {
    return axios.patch('/api/posts/deletePost', { postID, postOwner, authenticatedUsername }).then(res => {
      console.log('deletePost action.then => dispatch');
      const postsToDisplay = res.data[0];
      const messages = res.data[1];
      dispatch(postsPlusMessage(postsToDisplay, messages));
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
      const message = res.data[0];
      dispatch(addFlashMessage(message));
    });
  }
}

export function unpinPost(data) {
  console.log('unpin post action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('unpin action.then');
      console.log(res.data[0]);
      const message = res.data[0];
      dispatch(addFlashMessage(message));
    });
  }
}
