import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, conseillerActions } from '../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

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
      telephone: conseiller?.telephone,
      distanceMax: conseiller?.distanceMax,
      dateDisponibilite: new Date(conseiller?.dateDisponibilite),
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
          <p style={{ marginBottom: 'revert' }}>Nom&nbsp;: <strong>{ conseiller?.nom }</strong></p>
          <p style={{ marginBottom: 'revert' }}>Prénom&nbsp;: { conseiller?.prenom }</p>
          <p style={{ marginBottom: 'revert' }}>Email&nbsp;: { conseiller?.email }</p>
          <p>Téléphone&nbsp;: { conseiller?.telephone }</p>
          <p>Distance Max&nbsp;: { conseiller?.distanceMax } km </p>
          <p>Disponible à partir du&nbsp;: { dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
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
            <label className="fr-label" htmlFor="select">
            Distance Max&nbsp;:
            </label>
            <select className="fr-select" id="select"name="distanceMax" onChange={handleForm} >
              <option value={infos?.distanceMax}>{infos?.distanceMax}km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="15">15 km</option>
              <option value="20">20 km</option>
              <option value="40">40 km</option>
              <option value="100" >100 km</option>
              <option value="2000">2000 km (Toute la France)</option>
            </select>
            <label className="fr-label">Disponible à partir du</label>
            <DatePicker
              name="dateDisponibilite"
              className="fr-input fr-my-2w fr-mr-6w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={infos?.dateDisponibilite ?? ''}
              onChange={date => setInfos({ ...infos, dateDisponibilite: date })}
            />
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
