import axios from 'axios';
//import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

export function logout() {
  console.log('logout action');
  return dispatch => {
    ///localStorage.removeItem('jwtToken');
    //setAuthorizationToken(false);
    //dispatch(setCurrentUser({}));
  }
}

//i dont think using axios here will work -- 
//i think we need to link straight to our 
//route -- otherwise i get a cors error, 
//maybe you can figure it out
export function login(data){
  console.log('login action');
  return dispatch => {
    return axios.get('/api/auth/twitterLogin', data).then(res => {
    	console.log(res);
      //const token = res.data.token;
      //localStorage.setItem('jwtToken', token);
      //setAuthorizationToken(token);
      //dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}
