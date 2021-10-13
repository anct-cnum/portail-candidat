import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, conseillerActions } from '../../actions';
import PropTypes from 'prop-types';

function MonCompte({ setFlashMessage, infos, setInfos, conseiller }) {
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.authentication.user?.user);
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const successModifierInfos = useSelector(state => state?.user?.user);

  const [form, setForm] = useState(false);

  const activeFormulaire = () => {
    setForm(true);
    setFlashMessage(false);
    setInfos({
      nom: conseiller?.nom,
      prenom: conseiller?.prenom,
      email: conseiller?.email,
      telephone: conseiller?.telephone
    });
  };

  const handleForm = event => {
    let { name, value } = event.target;
    setInfos({
      ...infos,
      [name]: value
    });
  };

  const updateEmail = () => {
    dispatch(userActions.updateInfosCandidat({ id: _id, infos: infos }));
    setFlashMessage(true);
    setForm(false);
    setTimeout(() => {
      setFlashMessage(false);
    }, 10000);
  };

  useEffect(() => {
    dispatch(conseillerActions.get($id));
  }, [successModifierInfos]);

  return (
    <div>
      {form === false ?
        <div className="fr-my-3w">
          <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ conseiller?.nom }</strong></p>
          <p style={{ marginBottom: 'revert' }}>Prénom : { conseiller?.prenom }</p>
          <p style={{ marginBottom: 'revert' }}>Email : { conseiller?.email }</p>
          <p>Téléphone : { conseiller?.telephone }</p>
          <button className="fr-btn" onClick={activeFormulaire}>
            <span style={{ color: 'white' }} className="fr-fi-edit-line fr-mr-3v" aria-hidden="true"/>
              Modifier mes informations &ensp;
          </button>
        </div> :
        <div className="fr-container--fluid">
          <form className="fr-my-3w fr-col-md-8 fr-col-lg-8 fr-col-8 fr-col-sm-8">
            <label className="fr-label">Nom</label>
            <input className="fr-input" type="text" id="text-input-text" name="nom" value={infos?.nom} onChange={handleForm}/>
            <label className="fr-label">Prénom</label>
            <input className="fr-input" type="text" id="text-input-text" name="prenom" value={infos?.prenom} onChange={handleForm}/>
            <label className="fr-label">E-mail</label>
            <input className="fr-input" type="text" id="text-input-text" name="email" value={infos?.email} onChange={handleForm}/>
            <label className="fr-label">Téléphone</label>
            <input className="fr-input" type="text" id="text-input-text" maxLength="20" name="telephone" value={infos?.telephone} onChange={handleForm}/>
          </form>
          <div className="fr-col-lg-8 fr-col-md-8 fr-col-8 fr-col-sm-8">
            <button onClick={() => setForm(false)} className="fr-btn">Annuler</button>
            <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
          </div>
        </div>
      }
    </div>
  );
}
MonCompte.propTypes = {
  setFlashMessage: PropTypes.func,
  infos: PropTypes.object,
  setInfos: PropTypes.func,
  conseiller: PropTypes.object
};
export default MonCompte;
