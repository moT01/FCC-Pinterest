import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import postsReducer from './reducers/postsReducer';

export default combineReducers({
  flashMessages,
  auth,
  postsReducer
});
