import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, userActions } from '../../actions';
import FlashMessage from 'react-flash-message';

function SupprimerCandidature({ conseiller }) {

  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem('user'));

  const [displaySupprimerCandidatureForm, setDisplaySupprimerCandidatureForm] = useState(false);
  const [autre, setAutre] = useState(false);
  const [active, setActive] = useState(false);
  const [inputs, setInputs] = useState({
    errorInputs: false,
    motif: '',
    password: '',
  });

  let deleteError = useSelector(state => state.conseiller?.deleteCandidatureError);
  const deleteSuccess = useSelector(state => state.conseiller?.deleteSuccess);

  function handleChange(e) {
    if (e?.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    }
  }

  function handleSubmit() {
    if (conseiller) {
      setInputs(inputs => ({ ...inputs, errorInputs: false }));
      dispatch(conseillerActions.deleteCandidature(inputs.motif, conseiller?._id, user?.user?.name, inputs.password));
    } else {
      window.scrollTo(0, 0);
      setInputs(inputs => ({ ...inputs, errorInputs: true }));
    }
  }

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(userActions.logout());
    }
  }, [deleteSuccess]);

  useEffect(() => {
    setActive(!!inputs.password && !!inputs.motif);
  }, [inputs]);

  return (
    <>
      <div className="fr-mb-15w">
        <p className="supprimer-candidat-btn" onClick={ () => {
          setDisplaySupprimerCandidatureForm(true);
          setActive(false);
          setAutre(false);
        }}>
            Supprimer ma candidature et toutes mes informations
        </p>
      </div>
      {displaySupprimerCandidatureForm &&
        <dialog aria-labelledby="fr-modal-supprimer-candidat" role="dialog" id="fr-modal-supprimer-candidat" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" title="Fermer la fenêtre" onClick={ () => {
                      setDisplaySupprimerCandidatureForm(false);
                      setActive(false);
                    } }>Fermer</button>
                  </div>
                  {deleteError &&
                    <FlashMessage duration={5000}>
                      <p className="flashBag invalid">
                        { deleteError ? 'Une erreur est survenue : ' + deleteError :
                          'Une erreur est survenue lors de la suppression de votre candidature. Veuillez réessayer'}.
                      </p>
                    </FlashMessage>
                  }
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-supprimer-candidat" className="fr-modal__title">
                      <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                      Supprimer ma candidature et mes informations
                    </h1>
                    <p className="fr-mb-7w">
                      En cliquant sur &laquo;&nbsp;supprimer mes informations&nbsp;&raquo;, votre candidature ainsi que vos donn&eacute;es de compte candidat
                      (mail, t&eacute;l&eacute;phone, etc) seront int&eacute;gralement supprim&eacute;es de la base de donn&eacute;es
                      Conseiller num&eacute;rique France Services.
                      <b>Cette action est irr&eacute;versible.</b>
                    </p>


                    <div className="fr-form-group">
                      <fieldset className="fr-fieldset fr-fieldset--inline">
                        <div className="fr-mb-3w"><b>Pour quelle raison souhaitez-vous vous retirer du dispositif ?&nbsp;
                          <span className="important">*</span></b>
                        </div>
                        <div className="fr-fieldset__content">
                          <div className = "fr-radio-group fr-mr-12w">
                            <input name="motif" value="Trouvé un emploi" type="radio" id="emploi" onClick={e => {
                              handleChange(e);
                              setAutre(false);
                            }}/>
                            <label className="fr-label" htmlFor="emploi">J&rsquo;ai trouv&eacute; un emploi.</label>
                          </div>

                          <div className = "fr-radio-group fr-mr-15w">
                            <input name="motif" value="Recruté en tant que CnFs" type="radio" id="recruter" onClick={e => {
                              handleChange(e);
                              setAutre(false);
                            }}/>
                            <label className="fr-label" htmlFor="recruter">
                              J&rsquo;ai &eacute;t&eacute; recrut&eacute; en tant que conseiller num&eacute;rique.
                            </label>
                          </div>
                          <div className = "fr-radio-group fr-mr-15w"></div>
                          <div className = "fr-radio-group">
                            <input name="motif" value="Autre" type="radio" id="Autre" onClick={() => {
                              setAutre(true);
                              setInputs(inputs => ({ ...inputs, motif: '' }));
                            }}/>
                            <label className="fr-label" htmlFor="Autre">Autre.</label>
                          </div>
                        </div>
                        {autre &&
                        <div className="fr-ml-4w">
                          <label>
                          Vous pouvez préciser si vous le souhaitez :
                          </label>
                          <input name="motif" type="text" className="fr-input fr-mt-1w" style={{ width: '322px' }} onChange={handleChange}/>
                        </div>
                        }
                      </fieldset>
                    </div>

                    <div className="fr-col-6">
                      <label htmlFor="password">Votre mot de passe :</label>
                      <input type="password" className="fr-input fr-mt-1w" name="password" id="password" onChange={handleChange}/>
                    </div>

                    <div className="fr-mt-7w">
                      <button className="fr-btn fr-col-5" style={{ paddingLeft: '15%' }} onClick={ () => {
                        setDisplaySupprimerCandidatureForm(false);
                        setActive(false);
                      } }>Annuler</button>
                      <button className={active ? 'suppression-btn fr-col-offset-2 fr-col-5 ' : 'desactiver-btn fr-col-offset-2 fr-col-5'}
                        disabled={!active} onClick={handleSubmit}>
                        Supprimer mes informations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      }
    </>
  );
}

SupprimerCandidature.propTypes = {
  conseiller: PropTypes.object
};

export default SupprimerCandidature;
