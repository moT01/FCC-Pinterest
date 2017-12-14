import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  userPosts: [],
  user: ''

};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      case 'SET_CURRENT_USER':
        return {
          isAuthenticated: !isEmpty(action.user),
          user: action.user,
          userPosts: []
        }
      default: return state;
    }
}
