import axios from 'axios';

export function addFlashMessage(message) {
  return {
    type: 'ADD_FLASH',
    message
  };
}

export function createPost(data) {
  console.log('create post action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('action.then');
      console.log(res.data[0]);
      const message = res.data[0];
      dispatch(addFlashMessage(message));      
    });
  }
}
