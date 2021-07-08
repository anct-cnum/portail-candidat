import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';

function Informations() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  useEffect(() => {
    dispatch(conseillerActions.get($id));
  }, []);

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
