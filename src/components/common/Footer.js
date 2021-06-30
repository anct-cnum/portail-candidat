import React from 'react';

function Footer() {

  return (
    <footer className="fr-footer fr-mt-12w" role="contentinfo" id="footer">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-10">
            <div className="fr-footer__body">
              <div className="fr-container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className="fr-grid-row fr-grid-row--bottom">
                  <div>
                    <div>
                      <div className="fr-footer__brand">
                        <a className="fr-footer__brand-link">
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logoRF.svg" alt="logo République Française" style={{ height: '80px', marginRight: '28px' }}/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-anct.svg" alt="logo Agence Nationale De La Cohésion Des Territoires"
                              style={{ height: '59px', marginRight: '50px' }}/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-banque-des-territoires.svg" alt="logo Banque Des Territoires"
                              style={{ height: '35px', marginBottom: '27px', marginRight: '50px' }}/>
                          </div>
                          <div style={{ display: 'inline-block' }} >
                            <img src="/logos/logo-france-relance.svg" alt="logo France Relance" style={{ height: '70px', marginBottom: '7px' }}/>
                          </div>
                        </a>
                      </div>
                      <div className="fr-footer__content fr-mt-3w">
                        <p className="fr-footer__content-desc">
                      Conseiller Numérique France services est un dispositif financé par l&rsquo;&Eacute;tat dans le cadre de France Relance.
                      Il est piloté par l&rsquo;Agence Nationale de la Cohésion des Territoires et opéré par la Banque des Territoires.
                        </p>
                      </div>
                      <div>
                        <ul className="fr-footer__content-list" style={{ justifyContent: 'flex-end' }}>
                          <li >
                            <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
                          </li>
                          <li >
                            <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
                          </li>
                          <li >
                            <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
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
                          <a className="fr-footer__bottom-link fr-px-1w"
                            href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilité: non conforme
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item">
                          <a className="fr-footer__bottom-link fr-px-1w"
                            href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions légales
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item">
                          <a className="fr-footer__bottom-link fr-px-1w"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                        Données personnelles
                          </a>
                        </li>
                        <li className="fr-footer__bottom-item">
                          <a className="fr-footer__bottom-link fr-px-1w"
                            href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                        Conditions générales d&rsquo;utilisation
                          </a>
                        </li>
                      </ul>
                      <div className="fr-footer__bottom-copy">
                        <p>
                          Sauf mention contraire, tous les textes de ce site sont sous
                          &nbsp;
                          <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="blank">licence etalab-2.0</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
