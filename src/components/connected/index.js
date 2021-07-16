import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../common/Header';
import Documents from './Documents';
import Informations from './Informations';
import Menu from './Menu';
import MonCompte from './MonCompte';
import Welcome from './Welcome';

function Connected() {

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-3">
            <Menu />
          </div>
          <div className="fr-col-7">
            <>
              <Route path={`/accueil`} component={Welcome} />
              <Route path={`/informations`} component={Informations} />
              <Route path={`/documents`} component={Documents} />
              <Route path={`/mon-compte`} component={MonCompte} />
            </>
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </>
  );
}

export default Connected;
