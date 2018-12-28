import React from 'react';
import {
  Route,
  Switch,
  HashRouter
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import CreatePostPage from './components/createPost/CreatePostPage';
import MyPinsPage from './components/myPins/MyPinsPage';
import MyPostsPage from './components/myPosts/MyPostsPage';
import UserPostsPage from './components/userPosts/UserPostsPage';
import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/createPost" component={requireAuth(CreatePostPage)} />
        <Route exact path="/myPins" component={requireAuth(MyPinsPage)} />
        <Route exact path="/myPosts" component={requireAuth(MyPostsPage)} />
        <Route exact path="/userPage/:userId" component={UserPostsPage}/>
      </Switch>
    </App>
  </HashRouter>
);

export default createRoutes;
