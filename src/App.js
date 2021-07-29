import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';
import ChoosePassword from './components/anonymous/createAccount/ChoosePassword';

import PrivateRoute from './components/connected/PrivateRoute';
import Footer from './components/common/Footer';
import EmailConfirmer from './components/anonymous/ConfirmationEmail';
import { useSelector } from 'react-redux';

require('dotenv').config();

function App() {

  const downloading = useSelector(state => state.conseiller?.downloading);
  const uploading = useSelector(state => state.conseiller?.uploading);

  return (
    <div className="App">
      { (downloading === true || uploading === true) &&
        <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <Route path="/candidat/confirmation-email/:token" component={EmailConfirmer} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
