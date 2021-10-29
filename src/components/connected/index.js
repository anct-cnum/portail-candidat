import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../common/Header';
import MonEspace from './MonEspace';
import Menu from './Menu';

function Connected() {

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-0 fr-col-md-3 responsiveVisibilityMenu">
            <Menu />
          </div>
          <div className="fr-col-10 fr-col-md-7 marge-contenu">
            <Route path={`/mon-espace`} component={MonEspace} />
            <Redirect from="/" to="/mon-espace"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connected;
