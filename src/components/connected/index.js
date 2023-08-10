import React from 'react';
import Header from '../common/Header';
import Menu from './Menu';
import MonEspace from './MonEspace';

function Connected() {

  return (
    <>
      <Header connected />
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-0 fr-col-md-3 responsiveVisibilityMenu">
            <Menu />
          </div>
          <div className="fr-col-10 fr-col-md-7 marge-contenu">
            <MonEspace />
          </div>
        </div>
      </div>
    </>
  );
}

export default Connected;
