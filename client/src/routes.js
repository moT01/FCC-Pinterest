import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import CreatePostPage from './components/createPost/CreatePostPage';
import MyPinsPage from './components/myPins/MyPinsPage';
import MyPostsPage from './components/myPosts/MyPostsPage';
import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/createPost" component={requireAuth(CreatePostPage)} />
        <Route exact path="/myPins" component={requireAuth(MyPinsPage)} />
        <Route exact path="/myPosts" component={requireAuth(MyPostsPage)} />
      </Switch>
    </App>
  </Router>
);

export default createRoutes;
