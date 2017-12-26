import { LOAD_POSTS, CREATE_POST, GET_MY_POSTS, GET_USER_POSTS, DELETE_POST, PIN_POST, UNPIN_POST, MY_PINS } from '../actions/types';


const initialState = {
  postsToDisplay: [],
  myPosts: [],
  userPosts: [],
  myPins: []
};

export default (state = initialState, action = {}) => {
  let index;
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
          ...state.postsToDisplay.push(action.post)
        ],
        myPosts: [
          ...state.myPosts.push(action.post)
        ]
      }
    case GET_MY_POSTS:
      console.log(action);
      return { ...state,
      myPosts: action.posts
      }
    case GET_USER_POSTS:
      console.log(action);
      return { ...state,
      userPosts: action.posts
      }
    case DELETE_POST:
      console.log(action);

      //if remove owner from post
      if(action.post._id) {
        let index = state.postsToDisplay.findIndex(i => i._id === action.post._id);
        state.postsToDisplay[index] = action.post;

      //else if remove whole post
      } else {
        state.postsToDisplay = state.postsToDisplay.filter(post => post._id !== action.post);
        state.myPosts = state.myPosts.filter(post => post._id !== action.post);
      }
      return { ...state }
    case PIN_POST:
      console.log(action);
      index = state.postsToDisplay.findIndex(i => i._id === action.updatedPost._id);
      state.postsToDisplay[index] = action.updatedPost;
    
      return { ...state }
      
    case UNPIN_POST:
      console.log(action);
      //remove post from myPins
      state.myPins = state.myPins.filter(post => post._id !== action.post._id);
        
      //remove owner from post in postsToDisplay
      index = state.postsToDisplay.findIndex(i => i._id === action.post._id);
      state.postsToDisplay[index] = action.post;

      return { ...state }

    case MY_PINS:
      console.log(action);
      return { ...state,
        myPins: action.myPins      
      }

    default: return state;
  }
}
