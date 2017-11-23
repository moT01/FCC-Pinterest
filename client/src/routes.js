import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import ProfilePage from './components/profile/ProfilePage';
import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/profile" component={requireAuth(ProfilePage)}/>
        </Switch>
      </App>
    </Router>
);

export default createRoutes;
