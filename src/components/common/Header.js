import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ connected }) {
  const user = useSelector(state => state.authentication?.user?.user);

  return (
    <header className="fr-header" role="banner">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--top">
          <div className="fr-col-offset-1 responsiveHeaderTools" style={{ display: 'flex' }}>
            <div className="fr-header__body" style={{ display: 'flex' }}>
              <div className="fr-header__service sansBoxShadow" >
                <a className="fr-header__operator" href="/">
                  <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" className="logo"/>
                </a>
              </div>
              <div className="fr-header__service responsiveTextHeader sansBoxShadow fr-mt-2w">
                <a href="/" title="Portail Candidat">
                  <p className="fr-header__service-title">Portail Candidat</p>
                </a>
                <p className="fr-header__service-tagline">Gestion des informations du candidat</p>
              </div>
            </div>
            { connected &&
              <div className="fr-header__tools fr-mt-4w fr-mb-9v ">
                <ul className="fr-shortcuts__list menu-flex">
                  <li className="fr-shortcuts__item">
                    <h3 className="fr-tile__title user-header">
                      <span className="fr-fi-account-fill" /> {user?.name}
                    </h3>
                  </li>
                  <li className="fr-shortcuts__item">
                    <Link className="fr-btn fr-btn--sm" to={`/login`}>
                      <span className="hide-deconnexion">Se déconnecter&nbsp;</span>
                      <i className="ri-logout-box-r-line"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
        <div className="fr-col-1"></div>
      </div>
    </header>
  );
}

Header.propTypes = {
  connected: PropTypes.bool
};

export default Header;
