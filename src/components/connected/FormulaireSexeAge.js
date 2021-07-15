import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../common/Header';

function FormulaireSexeAge() {

  const [inputs, setInputs] = useState({
    date: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { date } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    console.log(inputs);
  }

  function handleSubmit() {}

  return (
    <>
      <Header connected/>
      <div className="fr-container fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 centrerTexte">
            <h2>Bienvenue sur votre espace candidat</h2>
            <p>Avant d&apos;aller plus loin merci de renseigner votre sexe et votre date de naissance.</p>
          </div>

          <div className="fr-col-6 fr-col-md-4 centrerTexte">
            <div className="fr-form-group ">
              <fieldset className="fr-fieldset fr-fieldset--inline">
                <div className="fr-mb-3w">Sexe <span className="important">*</span></div>
                <div className="fr-fieldset__content fr-ml-md-12w fr-ml-0w">
                  <div className = "fr-radio-group ">
                    <input name="sexe" value="Femme" className="" type="radio" id="Femme" onClick={handleChange}/>
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
              <input name="date"
                type="date"
                id="date"
                value={date}
                className="fr-input"
                onChange ={handleChange}/>

            </div>

            <button className="fr-btn" onClick={handleSubmit}>Valider</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormulaireSexeAge;
