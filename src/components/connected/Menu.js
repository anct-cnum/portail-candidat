import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../actions';

function Menu() {

  const location = useLocation();
  const dispatch = useDispatch();
  let menu = useSelector(state => state.menu);

  const toggleNav = () => {
    dispatch(menuActions.toggleNav());
  };

  return (
    <nav id="sideMenu" className="Menu fr-sidemenu" aria-label="Menu latéral">
      <div className="fr-sidemenu__inner">
        <button className="fr-sidemenu__btn" hidden aria-controls="fr-sidemenu-wrapper" onClick={toggleNav}>
          Menu
        </button>
        <div className={`${menu.expandNav ? '' : 'fr-collapse'}`} id="fr-sidemenu-wrapper">
          <ul className="fr-sidemenu__list">
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/accueil') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/accueil" style={{ padding: '0.5rem 0' }}>
                <div className="fr-container">
                  <div className="fr-grid-row fr-grid-row--end">
                    Accueil
                  </div>
                </div>
              </Link>
            </li>
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/informations') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/informations" style={{ padding: '0.5rem 0' }}>
                <div className="fr-container">
                  <div className="fr-grid-row fr-grid-row--end">
                    Mes informations
                  </div>
                </div>
              </Link>
            </li>
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/documents') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/documents" style={{ padding: '0.5rem 0' }}>
                <div className="fr-container">
                  <div className="fr-grid-row fr-grid-row--end">
                    Mes documents
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
