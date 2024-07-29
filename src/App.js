import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/anonymous/Login';
import Home from './components/connected/Home';
import ChoosePassword from './components/anonymous/createAccount/ChoosePassword';
import PrivateRoute from './components/connected/PrivateRoute';
import Footer from './components/common/Footer';
import EmailConfirmer from './components/anonymous/ConfirmationEmail';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import CandidatureSupprimee from './components/anonymous/CandidatureSupprimee';
import { useSelector } from 'react-redux';

import '@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import './assets/css/app.scss';

function App() {
  const isLoading = useSelector(state => state.alerteEtSpinner?.isLoading);

  return (
    <div className="App">
      {isLoading &&
        <div className="wrapperModal"></div>
      }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inscription/:token" element={<ChoosePassword />} />
        <Route path="/candidat/confirmation-email/:token" element={<EmailConfirmer />} />
        <Route path="/mot-de-passe-oublie" element={<ForgottenPassword />} />
        <Route path="/renouveler-mot-de-passe/:token" element={<ForgottenPassword />} />
        <Route path="/candidature-supprimee" element={<CandidatureSupprimee />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/mon-espace" />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
