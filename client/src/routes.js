import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import CreatePostPage from './components/createPost/CreatePostPage';
import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/createPost" component={requireAuth(CreatePostPage)} />
      </Switch>
    </App>
  </Router>
);

export default createRoutes;
