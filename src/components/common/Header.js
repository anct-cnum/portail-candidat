import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ connected }) {

  const user = useSelector(state => state.authentication.user?.user);
  const [menu, setmenu] = useState(false);

  const menuClick = () => {
    if (menu === false) {
      setmenu(true);
    } else {
      setmenu(false);
    }
  };

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
                  <div className="fr-header__tools">
                    <div className="fr-header__tools-links">
                      <ul className="fr-links-group">
                        <li>
                          <span>
                            <ul className="fr-nav-list">
                              <li className="fr-nav__item">
                                <button className="fr-sidemenu__btn" onClick={menuClick} aria-expanded={menu} aria-controls="menu-776" aria-current="false">
                                  <h3 className="fr-tile__title">
                                    <span className="fr-fi-account-fill " /> {user?.name}
                                  </h3>
                                </button>
                                <div className={ menu === true ? 'fr-collapse--expanded' : 'fr-collapse fr-nav--expanded'} id="menu-776">
                                  <ul className="fr-menu__list" style={{ paddingInlineStart: '3rem', marginTop: '1rem' }}>
                                    <li>
                                      <Link to={'/mon-compte'}>Mon compte</Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
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
