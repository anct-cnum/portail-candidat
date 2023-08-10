import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireSexeAgeActions, conseillerActions, alerteEtSpinnerActions } from '../../actions';
import Header from '../common/Header';
import Alerte from '../common/Alerte';
import Spinner from '../common/Spinner';

registerLocale('fr', fr);
function FormulaireSexeAge() {

  const dispatch = useDispatch();
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const isUpdated = useSelector(state => state.conseiller?.isUpdated);
  const error = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const [inputs, setInputs] = useState({
    errorInputs: false,
    date: '',
    sexe: '',
  });

  const todayDate = new Date();
  const maxDate = todayDate.getFullYear() - 16;
  const minDate = todayDate.getFullYear() - 99;

  const { date, sexe } = inputs;

  function handleChange(e) {
    if (e?.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    } else {
      setInputs(inputs => ({ ...inputs, date: e }));
    }
  }

  function handleSubmit() {
    if (date !== '' && date !== null && sexe !== '') {
      setInputs(inputs => ({ ...inputs, errorInputs: false }));
      dispatch(formulaireSexeAgeActions.updateCandidat({ sexe: sexe, dateDeNaissance: date }));
      dispatch(conseillerActions.get($id));
    } else {
      window.scrollTo(0, 0);
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires (*) du formulaire.',
        status: null, description: null
      }));
    }
  }

  useEffect(() => {
    if (error !== undefined && error !== false) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires (*) du formulaire.',
        status: null, description: null
      }));
    }
  }, [error]);

  useEffect(() => {
    if (isUpdated === true) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: 'Vos informations ont bien été enregistrées. Vous allez être redirigé vers votre espace candidat.',
        status: null, description: null
      }));
      setTimeout(function() {
        window.location.reload();
      }, 2000);
    }
  }, [isUpdated]);

  return (
    <>
      <Header connected />
      <Spinner loading={loading} />
      <div className="fr-container fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row fr-grid-row--center">
          <Alerte />
          {!isUpdated &&
            <>
              <div className="fr-col-12 centrerTexte">
                <h2>Bienvenue sur votre espace candidat</h2>
                <p>Avant d&apos;aller plus loin merci de renseigner votre sexe et votre date de naissance.</p>
              </div>
              <div className="fr-col-6 fr-col-md-5 centrerTexte">
                <div className="fr-form-group ">
                  <fieldset className="fr-fieldset fr-fieldset--inline">
                    <div className="fr-mb-3w">Vous êtes&nbsp;: <span className="important">*</span></div>
                    <div className="fr-fieldset__content fr-ml-md-12w fr-ml-0w">
                      <div className="fr-radio-group ">
                        <input name="sexe" value="Femme" type="radio" id="Femme" onClick={handleChange} required="required" />
                        <label className="fr-label" htmlFor="Femme">Femme</label>
                      </div>

                      <div className="fr-radio-group">
                        <input name="sexe" value="Homme" type="radio" id="Homme" onClick={handleChange} />
                        <label className="fr-label" htmlFor="Homme">Homme</label>
                      </div>

                      <div className="fr-radio-group">
                        <input name="sexe" value="Autre" type="radio" id="Autre" onClick={handleChange} />
                        <label className="fr-label" htmlFor="Autre">Autre</label>
                      </div>
                    </div>

                  </fieldset>
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label fr-mb-3w" htmlFor="date">Vous êtes né(e) le&nbsp;: <span className="important">*</span></label>
                  <DatePicker
                    id="date"
                    name="date"
                    className="fr-input"
                    placeholderText="jj/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    locale="fr"
                    selected={date}
                    onChange={handleChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    maxDate={new Date('12/31/' + maxDate)}
                    minDate={new Date('01/01/' + minDate)}
                    dropdownMode="select"
                    required="required"
                  />
                </div>
                <button className="fr-btn" onClick={handleSubmit}>Valider</button>
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default FormulaireSexeAge;
