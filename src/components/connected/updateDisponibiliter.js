import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions/conseiller.actions';

function UpdateDisponibiliter({ conseiller }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  function handleValideModification() {
    let disponible = true;
    if (conseiller.disponible) {
      disponible = false;
    }
    dispatch(conseillerActions.updateDisponibiliterCandidat(conseiller._id, disponible));
    setShowModal(false);
  }
  return (
    <>
      <button className="fr-btn fr-mb-4w" onClick={() => {
        setShowModal(true);
      }}>
        <span className="fr-fi-refresh-line fr-mr-3v" aria-hidden="true" />
        {conseiller?.disponible ? 'Me désinscrire' : 'Me réinscrire'}
      </button>
      {showModal &&
        <dialog aria-labelledby="fr-modal-supprimer-candidat" role="dialog" id="fr-modal-supprimer-candidat" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-11 fr-col-md-10 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" title="Fermer la fenêtre" onClick={() => {
                      setShowModal(false);
                    }}>Fermer</button>
                  </div>
                  <div className="fr-modal__content">
                    {conseiller?.disponible ?
                      <>
                        <h1 id="fr-modal-2-title" className="fr-modal__title">
                          <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                          Confirmer votre désinscription
                        </h1>
                        <p>
                          L&apos;envoi de cette demande annulera votre candidature sur la plateforme conseiller numerique.
                          Vous ne serez désormais plus visible par les structures employeuses.
                        </p>
                      </> :
                      <>
                        <h1 id="fr-modal-2-title" className="fr-modal__title">
                          <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                          Confirmer votre réinscription
                        </h1>
                        <p>
                          L&apos;envoi de cette demande rétablira votre candidature sur la plateforme conseiller numerique.
                          Vous serez désormais visible par les structures employeuses.
                        </p>
                      </>
                    }

                  </div>
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                      <li>
                        <button className="fr-btn" onClick={handleValideModification}>
                          Confirmer
                        </button>
                      </li>
                      <li>
                        <button className="fr-btn" onClick={() => {
                          setShowModal(false);
                        }}>
                          Annuler
                        </button>
                      </li>
                    </ul>
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

UpdateDisponibiliter.propTypes = {
  conseiller: PropTypes.object
};

export default UpdateDisponibiliter;
