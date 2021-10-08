import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../common/Header';
import Informations from './Informations';
import Menu from './Menu';

function Connected() {

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-12 fr-col-sm-3 rf-col-xs-1 responsiveVisibilityMenu">
            <Menu />
          </div>
          <div className="fr-col-12 fr-col-sm-7 responsiveBody">
            <Route path={`/informations`} component={Informations} />
            <Redirect from="/" to="/informations"/>
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </>
  );
}

export default Connected;
