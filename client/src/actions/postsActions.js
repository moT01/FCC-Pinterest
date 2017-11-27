import axios from 'axios';

export function loadAllPosts(allPosts) {
  return {
    type: 'LOAD_ALL_POSTS',
    allPosts
  };
}

export function allPostsPlusMessage(allPosts, message) {
  return {
    type: 'POSTS_AND_MESSAGE',
    allPosts,
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
  console.log('get all posts action');
  return dispatch => {
    return axios.get('/api/posts/allPosts', data).then(res => {
      console.log('allposts action.then');
      const allPosts = res.data;
      dispatch(loadAllPosts(allPosts));
    });
  }
}

export function createPost(data) {
  console.log('create post action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('create action.then');
      const message = res.data[0];
      dispatch(addFlashMessage(message));      
    });
  }
}

export function deletePost(postID, postOwner, authenticatedUsername) {
  console.log('delete post action');
  return dispatch => {
    return axios.patch('/api/posts/deletePost', { postID, postOwner, authenticatedUsername }).then(res => {
      console.log('delete action.then => dispatch');
      const allPosts = res.data[0];
      const messages = res.data[1];
      dispatch(allPostsPlusMessage(allPosts, messages));  
    });
  }
}

export function pinPost(data) {
  console.log('pin post action');
  return dispatch => {
    return axios.post('/api/posts/pinPost/:postID/"userID', data).then(res => {
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
