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
          <div className="fr-col-1"></div>
          <div className="fr-col-10 fr-mt-2w responsiveHeaderTools" style={{ display: 'flex' }}>
            <div className="rf-header__body rf-col-md-12"style={{ display: 'flex' }}>
              <div className="fr-header__service">
                <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
              </div>
              <div className="fr-header__service responsiveTextHeader">
                <a title="Portail Candidat">
                  <p className="fr-header__service-title">Portail Candidat</p>
                </a>
                <p className="fr-header__service-tagline">Gestion des informations du candidat</p>
              </div>
            </div>
            { connected &&
                <div className="fr-header__tools fr-mt-2w rf-col-md-6" style={{ marginBottom: '33px' }}>
                  {/* <div className="fr-shortcuts"> */}
                  <ul className="fr-shortcuts__list" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 className="fr-tile__title mr-5">
                      <span className="fr-fi-account-fill headerAlignement" /> {user?.name}
                    </h3>
                    <li className="fr-shortcuts__item">
                      <Link className="fr-btn fr-btn--sm" to={`/login`}>Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
                    </li>
                  </ul>
                  {/* </div> */}
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
