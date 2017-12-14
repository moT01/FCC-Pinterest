const initialState = {
  postsToDisplay: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'LOAD_POSTS':
      return {
        postsToDisplay: action.postsToDisplay
      }
    case 'POSTS_AND_MESSAGE':
      return {
        postsToDisplay: action.postsToDisplay,
        message: action.message
      }
    case 'ADD_FLASH':
      return {
        postsToDisplay: [],
        message: action.message
      }
    default: return state;
  }
}
