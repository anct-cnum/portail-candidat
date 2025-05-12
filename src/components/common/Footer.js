import React from 'react';

function Footer() {
  return (
    <footer className="fr-footer fr-mt-12w" id="footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand">
            <a className="fr-footer__brand-link">
              <div style={{ display: 'inline-block' }} >
                <img src="/logos/logoRF.svg" alt="" style={{ height: '80px', marginRight: '28px' }}/>
              </div>
              <div style={{ display: 'inline-block' }} >
                <img
                  src="/logos/logo-sonum-anct-min.svg"
                  alt=""
                  style={{ height: '75px', marginRight: '40px' }}
                />
              </div>
              <div style={{ display: 'inline-block' }} >
                <img src="/logos/logo-france-relance.svg" alt="" style={{ height: '75px', marginBottom: '7px' }}/>
              </div>
            </a>
          </div>
          <div className="fr-footer__content fr-mt-3w">
            <p className="fr-footer__content-descending">
              Conseiller Numérique est un dispositif financé par l’état dans le cadre de France Relance.
              Il est piloté par l’Agence Nationale de la Cohésion des Territoires et opéré par la Banque des Territoires.
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/" target="_blank" rel="noreferrer">
                  anct.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/" target="_blank" rel="noreferrer">
                  societenumerique.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/" target="_blank" rel="noreferrer">
                  banquedesterritoires.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-pr-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link fr-px-1w"
                href="https://www.conseiller-numerique.gouv.fr/accessibilite">
                  Accessibilité : non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link fr-px-1w"
                href="https://www.conseiller-numerique.gouv.fr/mentions-legales">
                  Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Données personnelles
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Conditions générales d’utilisation
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>
              Sauf mention contraire, tous les textes de ce site sont sous&nbsp;
              <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noreferrer">licence etalab-2.0</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
