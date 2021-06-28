import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ connected }) {

  const user = useSelector(state => state.authentication.user?.user);

  return (
    <header className="fr-header" role="banner">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--top">
            <div className="fr-col-1"></div>
            <div className="fr-col-10">
              <div className="fr-header__body-row">
                <div className="fr-header__brand fr-enlarge-link">
                  <div className="fr-header__brand-top">
                    <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
                  </div>
                  <div className="fr-header__service">
                    <a title="Portail Candidat">
                      <p className="fr-header__service-title">Portail Candidat</p>
                    </a>
                    <p className="fr-header__service-tagline">Gestion des informations du candidat</p>
                  </div>
                </div>
                { connected &&
                  <div className="fr-header__tools" style={{ marginBottom: '33px' }}>
                    <div className="fr-header__tools-links">
                      <ul className="fr-links-group">
                        <li>
                          <span>
                            <h3 className="fr-tile__title" style={{ paddingRight: '8px' }}>
                              <span className="fr-fi-account-fill" /> {user?.name}
                            </h3>
                          </span>
                        </li>
                        <li>
                          <Link className="fr-btn fr-btn--sm" to={`/login`}>Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="fr-col-1"></div>
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
