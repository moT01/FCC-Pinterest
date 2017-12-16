import { LOAD_POSTS, CREATE_POST, GET_MY_POSTS, DELETE_POST } from '../actions/types';


const initialState = {
  postsToDisplay: [],
  myPosts: [],
  userPosts: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case LOAD_POSTS:
    console.log(action);
      return { ...state,
        postsToDisplay: action.postsToDisplay
      }
    case CREATE_POST:
    console.log(action);
      return { ...state,
        postsToDisplay: [
          ...state.postsToDisplay,
          action.post
        ]
      }
    case GET_MY_POSTS:
    console.log(action);
      return { ...state,
      myPosts: action.posts
      }
    case DELETE_POST:
    console.log(action);
      return { ...state,
        postsToDisplay: state.postsToDisplay.filter(post => post._id !== action.postID),
        myPosts: state.myPosts.filter(post => post._id !== action.postID)
      }
    default: return state;
  }
}
