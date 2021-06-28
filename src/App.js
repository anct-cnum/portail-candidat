import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';
import ChoosePassword from './components/anonymous/createAccount/ChoosePassword';

import PrivateRoute from './components/connected/PrivateRoute';
import Footer from './components/common/Footer';

require('dotenv').config();

function App() {

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
