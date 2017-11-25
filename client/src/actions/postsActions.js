import axios from 'axios';

export function createPost(data) {
	console.log('create post action');
  return dispatch => {
    return axios.post('/api/posts/createPost', data).then(res => {
      console.log('hello');
    });
  }
}
