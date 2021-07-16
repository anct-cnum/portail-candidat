import React from 'react';
import { useSelector } from 'react-redux';

function Informations() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  return (
    <div className="informations">
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div style={{ margin: '0 0 0 1rem' }}>
            <h2>Mes informations</h2>
            <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ conseiller?.nom }</strong></p>
            <p style={{ marginBottom: 'revert' }}>Prénom : { conseiller?.prenom }</p>
            <p style={{ marginBottom: 'revert' }}>Email : { conseiller?.email }</p>
            <p>Téléphone : { conseiller?.telephone }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
