import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import CreatePostPage from './components/createPost/CreatePostPage';
import PostedPage from './components/posted/PostedPage';
import PinnedPage from './components/pinned/PinnedPage';
import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/createPost" component={requireAuth(CreatePostPage)} />
        <Route exact path="/posted" component={requireAuth(PostedPage)} />
        <Route exact path="/pinned" component={requireAuth(PinnedPage)} />
      </Switch>
    </App>
  </Router>
);

export default createRoutes;
