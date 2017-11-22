import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';

const createRoutes = () => (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage}/>
        </Switch>
      </App>
    </Router>
);

export default createRoutes;
