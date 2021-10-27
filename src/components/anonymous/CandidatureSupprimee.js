import React from 'react';
import Header from '../common/Header';

function CandidatureSupprimee() {

  return (
    <>
      <Header/>
      <div className="fr-container fr-mt-3w fr-mb-5w">
        <div className="fr-grid-row fr-grid-row--center fr-p-2w">
          <div className="fr-col-10 centrerTexte">
            <h1>Vos informations ont &eacute;t&eacute; supprim&eacute;es de la base de donn&eacute;es</h1>
            <img src="/logos/conseiller-conseillere.svg" style={{ width: '100%' }}/>
            <p className="fr-mt-5w">
              <b>L&rsquo;&eacute;quipe Conseiller num&eacute;rique France Services vous remercie pour votre participation au dispositif</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


export default CandidatureSupprimee;
