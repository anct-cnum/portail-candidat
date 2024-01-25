import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, userActions } from '../../actions';
import Header from '../common/Header';
import ModalResetPassword from './ModalResetPassword';
import Spinner from '../common/Spinner';
import Alerte from '../common/Alerte';
import ModalVerifyCode from './ModalVerifyCode';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showModalResetPassword, setShowModalResetPassword] = useState(false);
  const [showModalVerifyCode, setShowModalVerifyCode] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [countAttempt, setCountAttempt] = useState(3);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const error = useSelector(state => state.authentication.error);
  const deleteError = useSelector(state => state.conseiller?.deleteCandidatureError);
  const errorEmail = useSelector(state => state.motDePasseOublie.error);
  const validEmail = useSelector(state => state.motDePasseOublie.success);
  const loading = useSelector(state => state.motDePasseOublie?.loading);
  const messageCodeVerified = useSelector(state => state.authentication?.messageCodeVerified);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value.trim() }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(username, password, from));
    }
  }
  useEffect(() => {
    if (error?.resetPasswordCnil) {
      setShowModalResetPassword(true);
    } else if (error?.attemptFail) {
      setCountAttempt(3 - error?.attemptFail);
      if (error?.attemptFail === 3) {
        setShowErrorPassword(true);
        setTimeout(() => {
          setShowErrorPassword(false);
        }, 20000);
      }
    } else if (error?.openPopinVerifyCode) {
      setShowModalVerifyCode(true);
    }
  }, [error]);

  useEffect(() => {
    if (validEmail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: 'Un e-mail vous a été envoyé',
        status: null, description: null
      }));
    }
    if (errorEmail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorEmail,
        status: null, description: null
      }));
    }
  }, [loading]);

  useEffect(() => {
    if (messageCodeVerified) {
      dispatch(userActions.clearErrorConnexion());
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: messageCodeVerified,
        status: null, description: null
      }));
    }
  }, [messageCodeVerified]);
  return (
    <div>
      <Header />
      <Spinner loading={loading} />
      <Alerte />
      {showErrorPassword &&
        <p className="fr-label flashBag invalid">
          Vous avez saisi un mot de passe incorrect &agrave; 3 reprises. Nous avons temporairement verrouill&eacute; votre compte.<br/>
          R&eacute;essayez dans 10 min. Si vous l&rsquo;avez oubli&eacute;, cliquez sur&nbsp;
          &quot;<Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute; ?" >Mot de passe oubli&eacute; ?</Link>&quot;
        </p>
      }
      {showModalResetPassword &&
        <ModalResetPassword username={username} setShowModalResetPassword={setShowModalResetPassword} />
      }
      {showModalVerifyCode &&
        <ModalVerifyCode setShowModalVerifyCode={setShowModalVerifyCode} email={username}/>
      }
      <div className="fr-container fr-mt-3w fr-mb-5w">
        <div className="fr-grid-row">
          <div className="fr-col-offset-3"></div>
          <div
            className="Login fr-col-6"
            style={{ textAlign: 'center' }}>
            <h2>Connexion</h2>
            <div>
              <div>
                {(error && !error?.resetPasswordCnil && !error?.openPopinVerifyCode && !error?.attemptFail) &&
                <span style={{ color: 'red' }}>{error.error?.message?.toString() ?? 'Une erreur s\'est produite'}</span>}
                {deleteError && <span style={{ color: 'red' }}>{'Une erreur est survenue : ' + deleteError}</span>}
              </div>

              <div className="fr-my-3w">
                <label className="fr-label">Adresse email</label>
                <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !username &&
                  <div className="invalid">Adresse email requise</div>
                }
              </div>

              <div className="fr-my-3w">
                <label className="fr-label">Mot de passe</label>
                <input name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className={(submitted && !password ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
                }
              </div>
              {error?.attemptFail < 3 &&
                  <div className="fr-mb-2w" style={{ color: 'red' }}> <b>Mot de passe incorrect</b>, il vous reste&nbsp;
                    <b>{countAttempt}&nbsp;{countAttempt > 1 ? 'tentatives' : 'tentative' }</b><br/>
                     avant le verrouillage de votre compte.
                  </div>
              }
              {loggingIn && <span>Connexion en cours...</span>}
              <button className="fr-btn" onClick={handleSubmit}>Se connecter</button>
              <p className="fr-mt-3w">
                <Link to={`/mot-de-passe-oublie`}>Mot de passe oublié ?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
