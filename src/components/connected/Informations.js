/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, conseillerActions } from '../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

function Informations({ setFlashMessage, infos, setInfos, conseiller }) {
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
          <p className="info-candidat">Nom&nbsp;: <strong>{ conseiller?.nom }</strong></p>
          <p className="info-candidat">Prénom&nbsp;: { conseiller?.prenom }</p>
          <p className="info-candidat">Email&nbsp;: { conseiller?.email }</p>
          <p>Téléphone&nbsp;: { conseiller?.telephone }</p>
          <p>Disponible à partir du&nbsp;: { dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
          <button className="fr-btn fr-mt-6w fr-mb-4w" onClick={activeFormulaire}>
            <span className="fr-fi-edit-line fr-mr-3v" aria-hidden="true"/>
              Modifier mes informations
          </button>
        </div> :
        <div className="fr-container--fluid">
          <div className="fr-grid-row">
            <form className="fr-my-3w fr-col-10 fr-col-lg-8">
              <label className="fr-label">Nom</label>
              <input className="fr-input" type="text" id="text-input-nom" name="nom" value={infos?.nom} onChange={handleForm}/>
              <label className="fr-label">Prénom</label>
              <input className="fr-input" type="text" id="text-input-prenom" name="prenom" value={infos?.prenom} onChange={handleForm}/>
              <label className="fr-label">E-mail</label>
              <input className="fr-input" type="text" id="text-input-email" name="email" value={infos?.email} onChange={handleForm}/>
              <label className="fr-label">Téléphone</label>
              <input className="fr-input" type="text" id="text-input-telephone" maxLength="20" name="telephone" value={infos?.telephone} onChange={handleForm}/>
              <label className="fr-label">Disponible à partir du</label>
              <DatePicker
                name="dateDisponibilite"
                className="fr-input fr-my-2w"
                dateFormat="dd/MM/yyyy"
                locale="fr"
                selected={infos?.dateDisponibilite ?? ''}
                onChange={date => setInfos({ ...infos, dateDisponibilite: date })}
                minDate={new Date()}
              />
            </form>
            <div className="fr-col-5">
              <button onClick={() => setForm(false)} className="fr-btn red-btn info-btn fr-mb-1w">Annuler</button>
            </div>

            <div className="fr-col-5 fr-col-lg-3">
              <button className="fr-btn info-btn contenu-droite fr-mb-1w " onClick={updateEmail}>Valider</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
Informations.propTypes = {
  setFlashMessage: PropTypes.func,
  infos: PropTypes.object,
  setInfos: PropTypes.func,
  conseiller: PropTypes.object
};
export default Informations;
