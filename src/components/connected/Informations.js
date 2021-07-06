import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';

function Informations() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);
  const [infoForm, setInfoForm] = useState();
  const [formulaire, setFormulaire] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);
  const error = useSelector(state => state?.conseiller?.patchError);

  useEffect(() => {
    return setInfoForm(conseiller?.conseiller);
  }, []);

  const handleForm = event => {
    const { name, value } = event.target;
    setInfoForm({
      ...infoForm,
      [name]: value
    });
  };

  const updateInfo = () => {
    dispatch(conseillerActions.patchInfoConseiller(infoForm));
    setFormulaire(false);
    setFlashMessage(true);
    setTimeout(() => {
      setFlashMessage(false);
    }, 10000);
  };

  return (
    <div className="informations">
      {flashMessage === true ?
        <div className="">
          <div style={{ width: '55%' }}>
            <div>
              <FlashMessage duration={10000}>
                { (error === undefined || error === false) &&
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  La mise à jour a été effectuée avec succès
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                }
                { (error !== undefined && error !== false) &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La mise à jour a échoué, veuillez réessayer plus tard
                </p>
                }
              </FlashMessage>
            </div>
          </div>
        </div> : ''
      }
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div className="fr-col-5">
            <h2>Mes informations</h2>
            { formulaire === false &&
              <>
                <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ infoForm?.nom }</strong></p>
                <p style={{ marginBottom: 'revert' }}>Prénom : { infoForm?.prenom }</p>
                <p style={{ marginBottom: 'revert' }}>Email : { infoForm?.email }</p>
                <p>Téléphone : { infoForm?.telephone }</p>
                <div className="fr-mt-3w">
                  <button className="fr-btn" onClick={() => setFormulaire(true)}>
                    Modifier mes informations
                    <span style={{ color: 'white' }} className="fr-fi-edit-line fr-ml-4v" aria-hidden="true"/>
                  </button>
                </div>
              </>
            }
            { formulaire === true && <>
              <form className="fr-my-5w">
                <label className="fr-label">Nom</label>
                <input className="fr-input" type="text" id="text-input-text" name="nom" value={infoForm?.nom} onChange={handleForm} />
                <label className="fr-label fr-mt-5v">Prénom</label>
                <input className="fr-input" type="text" id="text-input-text" name="prenom" value={infoForm?.prenom} onChange={handleForm} />
                <label className="fr-label fr-mt-5v">E-mail</label>
                <input className="fr-input" type="text" id="text-input-text" name="email" value={infoForm?.email} onChange={handleForm}/>
                <label className="fr-label fr-mt-5v">Téléphone</label>
                <input className="fr-input" type="text" id="text-input-text" name="telephone" value={infoForm?.telephone} onChange={handleForm}/>
              </form>
              <button onClick={() => setFormulaire(false)} className="fr-btn">Annuler</button>
              <button style={{ float: 'right' }} className="fr-btn" onClick={updateInfo}>Valider</button>
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
