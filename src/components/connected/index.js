import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../common/Header';
import Informations from './Informations';
import Menu from './Menu';
import MonCompte from './MonCompte';

function Connected() {

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-12 fr-col-sm-3">
            <Menu />
          </div>
          <div className="fr-col-12 fr-col-sm-7">
            <Route path={`/informations`} component={Informations} />
            <Route path={`/mon-compte`} component={MonCompte} />
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </>
  );
}

export default Connected;
