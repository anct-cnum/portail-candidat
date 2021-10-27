import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../common/Header';
import MonEspace from './MonEspace';
import Menu from './Menu';

function Connected() {

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w fr-ml-n3v">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-12 fr-col-sm-3 fr-col-xs-1 responsiveVisibilityMenu">
            <Menu />
          </div>
          <div className="fr-col-12 fr-col-sm-7">
            <Route path={`/mon-espace`} component={MonEspace} />
            <Redirect from="/" to="/mon-espace"/>
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </>
  );
}

export default Connected;
