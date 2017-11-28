const initialState = {
  allPosts: [],
  message: ''
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'LOAD_ALL_POSTS':
      return {
        allPosts: action.allPosts
      }
    case 'POSTS_AND_MESSAGE':
      return {
        allPosts: action.allPosts,
        message: action.message
      }
    case 'ADD_FLASH':
      return {
        allPosts: [],
        message: action.message
      }
    default: return state;
  }
}
