import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '@gouvfr/dsfr/dist/utility/icons/icons-user/icons-user.min.css';

function Header({ connected }) {
  const user = useSelector(state => state.authentication?.user?.user);

  return (
    <header className="fr-header" role="banner">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--top">
          <div className="fr-col-offset-1 responsiveHeaderTools" style={{ display: 'flex' }}>
            <div className="fr-header__body" style={{ display: 'flex' }}>
              <div className="fr-header__service sansBoxShadow" >
                <Link className="fr-header__operator" to="/">
                  <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique" className="logo"/>
                </Link>
              </div>
              <div className="fr-header__service responsiveTextHeader sansBoxShadow fr-mt-2w placement-droite">
                <Link to="/" title="Portail Candidat">
                  <p className="fr-header__service-title">Portail Candidat</p>
                </Link>
                <p className="fr-header__service-tagline">Gestion des informations du candidat</p>
              </div>
            </div>
            { connected &&
              <div className="fr-header__tools fr-mt-4w fr-mb-9v ">
                <ul className="fr-shortcuts__list menu-flex">
                  <li className="fr-shortcuts__item">
                    <h3 className="fr-tile__title user-header">
                      <span className="fr-icon-account-circle-fill"/> {user?.name}
                    </h3>
                  </li>
                  <li className="fr-shortcuts__item placement-droite">
                    <Link className="fr-btn fr-btn--sm" to="/login">
                      <span className="hide-deconnexion">Se déconnecter&nbsp;</span>
                      <span className="fr-icon-logout-box-r-line" aria-hidden="true"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  connected: PropTypes.bool
};

export default Header;
