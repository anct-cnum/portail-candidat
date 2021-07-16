import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireSexeAgeActions } from '../../actions/formulaireSexeAge.action';
import FlashMessage from 'react-flash-message';

registerLocale('fr', fr);
function FormulaireSexeAge() {

  const dispatch = useDispatch();
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const isUpdated = useSelector(state => state.conseiller?.isUpdated);
  const error = useSelector(state => state.conseiller?.error);
  const [inputs, setInputs] = useState({
    date: '',
    sexe: '',
  });

  const { date, sexe } = inputs;

  if (isUpdated) {
    setTimeout(function() {
      window.location.reload();
    }, 2000);
  }

  function handleChange(e) {
    if (e.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    } else {
      setInputs(inputs => ({ ...inputs, date: e }));
    }
  }

  function handleSubmit() {
    dispatch(formulaireSexeAgeActions.updateCandidat({ idCandidat: $id, sexe: sexe, dateDeNaissance: date }));
  }

  return (
    <div className="fr-container fr-container-fluid fr-mt-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 centrerTexte">
          <h2>Bienvenue sur votre espace candidat</h2>
          <p>Avant d&apos;aller plus loin merci de renseigner votre sexe et votre date de naissance.</p>
        </div>
        <div className="fr-col-12">
          { error &&
            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={10000} >
                <div className=" flashBag labelError">
                  <span>
                    {error}
                  </span>
                </div>
              </FlashMessage>
            </div>
          }
          { isUpdated &&
            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={10000} >
                <div className=" flashBag">
                  <span>
                    Vos informations ont bien été ajouté, vous allez être redirigé vers l&apos;accueil !
                  </span>
                </div>
              </FlashMessage>
            </div>
          }
        </div>
        <div className="fr-col-6 fr-col-md-4 centrerTexte">
          <div className="fr-form-group ">
            <fieldset className="fr-fieldset fr-fieldset--inline">
              <div className="fr-mb-3w">Sexe <span className="important">*</span></div>
              <div className="fr-fieldset__content fr-ml-md-12w fr-ml-0w">
                <div className = "fr-radio-group ">
                  <input name="sexe" value="Femme" className="" type="radio" id="Femme" onClick={handleChange} required="required"/>
                  <label className="fr-label" htmlFor="Femme">Femme</label>
                </div>

                <div className = "fr-radio-group">
                  <input name="sexe" value="Homme" className="" type="radio" id="Homme" onClick={handleChange}/>
                  <label className="fr-label" htmlFor="Homme">Homme</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="fr-my-3w">
            <label className="fr-label fr-mb-3w" htmlFor="date">Date de naissance <span className="important">*</span></label>
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
              dropdownMode="select"
              required="required"
            />
          </div>

          <button className="fr-btn" onClick={handleSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
}

export default FormulaireSexeAge;
