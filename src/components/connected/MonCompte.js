import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';

function MonCompte() {
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.authentication.user?.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const [form, setForm] = useState(false);
  const error = useSelector(state => state?.user?.patchError);
  const [flashMessage, setFlashMessage] = useState(false);
  const [infos, setInfos] = useState({
    nom: conseiller?.nom,
    prenom: conseiller?.prenom,
    email: conseiller?.email,
    telephone: conseiller?.telephone
  });

  useEffect(() => {
    dispatch(conseillerActions.get($id));
  }, []);

  const activeFormulaire = () => {
    setForm(true);
    setFlashMessage(false);
    setInfos({
      nom: conseiller?.nom,
      prenom: conseiller?.prenom,
      email: conseiller?.email,
      telephone: conseiller?.telephone
    });
  };

  const handleForm = event => {
    let { name, value } = event.target;
    setInfos({
      ...infos,
      [name]: value
    });
  };

  const updateEmail = () => {
    dispatch(userActions.updateUserEmail({ id: _id, infos: infos }));
    setTimeout(() => {
      dispatch(conseillerActions.get($id));
      setFlashMessage(true);
    }, 0);
    dispatch(conseillerActions.get($id));
    setForm(false);
    setTimeout(() => {
      setFlashMessage(false);
    }, 10000);
  };

  return (
    <div>
      {flashMessage === true ?
        <div className="">
          <div style={{ width: '50%' }}>
            <div>
              <FlashMessage duration={10000}>
                { error && (error !== undefined || error !== false) &&
                <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                  Cet adresse e-mail est déjà utilisée
                </p>
                }
                { (error === undefined || error === false) &&
                 <p className="fr-label flashBag" style={{ fontSize: '16px' }}>

                   { infos.email === conseiller?.email ? <> La mise à jours a été éffectué avec succès </> :
                     <>Nous vous avons envoyé un mail à : <strong style={{ color: 'black' }}>{infos?.email}</strong> pour confirmation</> }
                  &nbsp;
                   <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                 </p>
                }
              </FlashMessage>
            </div>
          </div>
        </div> : ''
      }
      <h2 style={{ marginTop: '0' }}>Mon compte</h2>
      {form === false ?
        <>
          <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ conseiller?.nom }</strong></p>
          <p style={{ marginBottom: 'revert' }}>Prénom : { conseiller?.prenom }</p>
          <p style={{ marginBottom: 'revert' }}>Email : { conseiller?.email }</p>
          <p>Téléphone : { conseiller?.telephone }</p>
          <button className="fr-btn" onClick={activeFormulaire}>
              Modifier mes informations &ensp;
            <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true"/>
          </button>
        </> :
        <div className="fr-container--fluid">
          <form className="fr-my-3w fr-col-md-4 fr-col-lg-4 fr-col-4 fr-col-sm-8">
            <label className="fr-label">Nom</label>
            <input className="fr-input" type="text" id="text-input-text" name="nom" value={infos?.nom} onChange={handleForm}/>
            <label className="fr-label">Prénom</label>
            <input className="fr-input" type="text" id="text-input-text" name="prenom" value={infos?.prenom} onChange={handleForm}/>
            <label className="fr-label">E-mail</label>
            <input className="fr-input" type="text" id="text-input-text" name="email" value={infos?.email} onChange={handleForm}/>
            <label className="fr-label">Téléphone</label>
            <input className="fr-input" type="text" id="text-input-text" name="telephone" value={infos?.telephone} onChange={handleForm}/>
          </form>
          <div className="fr-col-lg-4 fr-col-md-4 fr-col-4 fr-col-sm-8">
            <button onClick={() => setForm(false)} className="fr-btn">Annuler </button>
            <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
          </div>
        </div>
      }
    </div>
  );
}

export default MonCompte;
