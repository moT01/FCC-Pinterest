import { LOAD_POSTS, CREATE_POST } from '../actions/types';


const initialState = {
  postsToDisplay: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case LOAD_POSTS:
      return {
        postsToDisplay: action.postsToDisplay
      }
    case CREATE_POST:
    console.log(action);
      return { ... state,
        postsToDisplay: [
          ...state.postsToDisplay,
          action.post
        ]
      }
    default: return state;
  }
}
