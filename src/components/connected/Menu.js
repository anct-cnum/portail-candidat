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
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/informations') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/mon-espace">
                <div className="fr-container-fluid">
                  <div className="fr-grid-row fr-grid-row--end">
                    <div className="fr-col-12">
                    Mon espace
                    </div>
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
