/* eslint-disable max-len */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import Footer from './Footer';

describe('footer', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('devrait faire le rendu du footer sans erreur', () => {
    act(() => {
      render(<Footer />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<footer class=\\"fr-footer fr-mt-12w\\" role=\\"contentinfo\\" id=\\"footer\\">
        <div class=\\"fr-container\\">
          <div class=\\"fr-grid-row\\">
            <div class=\\"fr-col-1\\"></div>
            <div class=\\"fr-col-10\\">
              <div class=\\"fr-footer__body\\">
                <div class=\\"fr-container\\" style=\\"padding-left: 0px; padding-right: 0px;\\">
                  <div class=\\"fr-grid-row fr-grid-row--bottom\\">
                    <div>
                      <div>
                        <div class=\\"fr-footer__brand\\"><a class=\\"fr-footer__brand-link\\">
                            <div style=\\"display: inline-block;\\"><img src=\\"/logos/logoRF.svg\\" alt=\\"logo République Française\\" style=\\"height: 80px; margin-right: 28px;\\"></div>
                            <div style=\\"display: inline-block;\\"><img src=\\"/logos/logo-anct.svg\\" alt=\\"logo Agence Nationale De La Cohésion Des Territoires\\" style=\\"height: 59px; margin-right: 50px;\\"></div>
                            <div style=\\"display: inline-block;\\"><img src=\\"/logos/logo-france-relance.svg\\" alt=\\"logo France Relance\\" style=\\"height: 70px; margin-bottom: 7px;\\"></div>
                          </a></div>
                        <div class=\\"fr-footer__content fr-mt-3w\\">
                          <p class=\\"fr-footer__content-desc\\">Conseiller Numérique France services est un dispositif financé par l’État dans le cadre de France Relance. Il est piloté par l’Agence Nationale de la Cohésion des Territoires et opéré par la Banque des Territoires.</p>
                        </div>
                        <div>
                          <ul class=\\"fr-footer__content-list\\" style=\\"justify-content: flex-end;\\">
                            <li><a class=\\"fr-footer__content-link\\" href=\\"https://agence-cohesion-territoires.gouv.fr/\\">anct.gouv.fr</a></li>
                            <li><a class=\\"fr-footer__content-link\\" href=\\"https://societenumerique.gouv.fr/\\">societenumerique.gouv.fr</a></li>
                            <li><a class=\\"fr-footer__content-link\\" href=\\"https://www.banquedesterritoires.fr/\\">banquedesterritoires.fr</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class=\\"fr-footer__bottom\\">
                        <ul class=\\"fr-footer__bottom-list\\">
                          <li class=\\"fr-footer__bottom-item\\"><a class=\\"fr-footer__bottom-link fr-pr-1w\\" href=\\"https://aide.conseiller-numerique.gouv.fr/fr/\\">FAQ</a></li>
                          <li class=\\"fr-footer__bottom-item\\"><a class=\\"fr-footer__bottom-link fr-px-1w\\" href=\\"https://www.conseiller-numerique.gouv.fr/accessibilite\\">Accessibilité: non conforme</a></li>
                          <li class=\\"fr-footer__bottom-item\\"><a class=\\"fr-footer__bottom-link fr-px-1w\\" href=\\"https://www.conseiller-numerique.gouv.fr/mentions-legales\\">Mentions légales</a></li>
                          <li class=\\"fr-footer__bottom-item\\"><a class=\\"fr-footer__bottom-link fr-px-1w\\" href=\\"https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf\\">Données personnelles</a></li>
                          <li class=\\"fr-footer__bottom-item\\"><a class=\\"fr-footer__bottom-link fr-px-1w\\" href=\\"https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf\\">Conditions générales d’utilisation</a></li>
                        </ul>
                        <div class=\\"fr-footer__bottom-copy\\">
                          <p>Sauf mention contraire, tous les textes de ce site sont sous &nbsp;<a href=\\"https://github.com/etalab/licence-ouverte/blob/master/LO.md\\" target=\\"blank\\">licence etalab-2.0</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=\\"fr-col-1\\"></div>
          </div>
        </div>
      </footer>"
    `);
  });
});
