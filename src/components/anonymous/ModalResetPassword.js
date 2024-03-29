import React from 'react';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import { useDispatch } from 'react-redux';

const ModalResetPassword = ({ setShowModalResetPassword, username }) => {
  const dispatch = useDispatch();

  function handleSendEmail() {
    dispatch(userActions.forgottenPassword(username));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowModalResetPassword(false);
  }
  return (
    <dialog aria-labelledby="fr-modal-reset-password" role="dialog" id="fr-modal-reset-password" className="fr-modal modalOpened">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fen&ecirc;tre modale"
                  aria-controls="fr-modal-1"
                  onClick={() => setShowModalResetPassword(false)}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                  <span className="fr-icon-arrow-right-line fr-icon--lg"></span>
                  R&eacute;initialiser votre mot de passe
                </h1>
                <p>
                  Conform&eacute;ment aux nouvelles r&egrave;gles de s&eacute;curit&eacute;
                  des mots de passe impos&eacute;es par la CNIL, votre mot de passe de
                  l&rsquo;espace candidat a &eacute;t&eacute; r&eacute;initialis&eacute;.
                  Vous allez recevoir par mail, un lien qui vous permettra de d&eacute;finir
                  un nouveau mot de passe.
                </p>
              </div>
              <div className="fr-modal__footer">
                <button className="fr-btn fr-ml-auto" onClick={handleSendEmail}>
                  Envoyer le lien
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

ModalResetPassword.propTypes = {
  setShowModalResetPassword: PropTypes.func,
  username: PropTypes.string,
};

export default ModalResetPassword;
