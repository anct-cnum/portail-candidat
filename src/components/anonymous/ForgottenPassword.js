import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../common/Header';
import { userActions } from '../../actions';
import { Link, useParams } from 'react-router-dom';

function ForgottenPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();
  /* Etape 1*/
  const [inputEmail, setInputsEmail] = useState({
    username: ''
  });
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const { username } = inputEmail;
  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setInputsEmail(inputEmail => ({ ...inputEmail, [name]: value }));
  }
  function handleSubmitEmail() {
    setSubmittedEmail(true);
    if (username) {
      dispatch(userActions.forgottenPassword(username.toLowerCase()));
    }
  }
  const errorEmail = useSelector(state => state.motDePasseOublie.error);
  const validEmail = useSelector(state => state.motDePasseOublie.success);

  /* Etape 2 */
  const [inputsPassword, setInputsPassword] = useState({
    password: '',
    confirmPassword: ''
  });

  const [submittedPassword, setSubmittedPassword] = useState(false);
  const { password, confirmPassword } = inputsPassword;

  const resultVerifyToken = useSelector(state => state.createAccount.resultVerifyToken);
  const resultChoosePassword = useSelector(state => state.createAccount.resultChoosePassword);
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);

  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const errorPassword = useSelector(state => state.createAccount.error);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setInputsPassword(inputsPassword => ({ ...inputsPassword, [name]: value }));
  }

  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,199})/);

  function handleSubmitPassword() {
    setSubmittedPassword(true);
    if (password && confirmPassword === password && checkComplexity.test(password)) {
      dispatch(userActions.choosePassword(token, password, 'renouvellement'));
    }
  }

  return (
    <>
      <Header/>
      <div className="fr-container fr-mt-3w fr-mb-5w">
        <div className="fr-grid-row fr-grid-row--center fr-p-2w">

          {!token &&
          /* Etape 1 */
          <>
            <div className="Login fr-col-6">
              <h2>Mot de passe oubli&eacute; ?</h2>
              <p className="fr-my-3w">Nous allons vous envoyer un e-mail afin de vous permettre de modifier votre mot de passe.</p>
              {submittedEmail && validEmail &&
               <div className="valid fr-mb-3w">L&rsquo;e-mail de renouvellement de mot de passe a pu &ecirc;tre envoy&eacute; sur&nbsp;: {username} !</div>
              }
              {submittedEmail && errorEmail === 'User not found' &&
                <div className="invalid fr-mb-3w">
                  L&rsquo;e-mail de renouvellement de mot de passe n&rsquo;a pas pu &ecirc;tre envoy&eacute;, v&eacute;rifiez votre adresse e-mail !
                </div>
              }
              {submittedEmail && errorEmail === 'Error authorization forgottenPassword' &&
                <div className="invalid fr-mb-3w">
                  Veuillez d&rsquo;abord activer votre compte via le dernier email d&rsquo;invitation re&ccedil;u sur {username}
                </div>
              }
              {submittedEmail && errorEmail === 'Error authorization user' &&
                <div className="invalid fr-mb-3w">
                  Le compte {username} n&rsquo;a pas acc&egrave;s &agrave; ce portail.
                </div>
              }
              {submittedEmail && !username &&
                <div className="invalid fr-mb-3w">Adresse email requise</div>
              }

              <label className="fr-label">Adresse email</label>
              <input name="username" value={username} onChange={handleChangeEmail}
                className={(submittedEmail && !username ? ' is-invalid fr-input' : 'fr-input')}
              />

              <button className="fr-btn fr-my-3w" onClick={handleSubmitEmail}>Poursuivre</button>
            </div>
          </>
          }
          {token &&
            /* Etape 2 */
            <div className="Login fr-col-8 fr-p-5w">
              <h2>Renouveler votre mot de passe<br /><span className="fr-fi-account-fill fr-fi--xl" /></h2>

              { verifyingToken &&
                <span>Chargement...</span>
              }

              { tokenVerified === false &&
                <span>D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;jà &eacute;t&eacute; utilis&eacute;.</span>
              }

              { tokenVerified && !passwordChoosen && resultVerifyToken?.role === 'candidat' &&
              <div>
                <div>
                  {errorPassword && <span>{errorPassword.error ? errorPassword.error : 'Une erreur s\'est produite'}</span>}
                </div>
                <span>Celui-ci doit contenir au moins 12 caract&egrave;res dont une minuscule,
                  une majuscule, un chiffre et un caract&egrave;re sp&eacute;cial(!@#$%^&amp;*)</span>


                <div className="fr-my-3w">
                  <label className="fr-label">Votre adresse email&nbsp;:</label>
                  <span>{resultVerifyToken.name}</span>
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Mot de passe</label>
                  <input name="password"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    className={(submittedPassword && !password ? ' is-invalid fr-input' : 'fr-input')} />
                  {submittedPassword && !password &&
                      <div className="invalid">Mot de passe requis</div>
                  }
                  { password && !checkComplexity.test(password) &&
                      <span className="invalid">Le mot de passe ne correspond pas aux exigences de s&eacute;curit&eacute;.</span>
                  }
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Mot de passe (confirmation)</label>
                  <input name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChangePassword}
                    className={(password !== confirmPassword ? ' is-invalid fr-input' : 'fr-input')} />
                  {password !== confirmPassword &&
                      <div className="invalid">Le mot de passe doit &ecirc;tre identique</div>
                  }
                </div>

                {choosingPassword && <span>Chargement...</span>}
                <button className="fr-btn" onClick={handleSubmitPassword}>Valider</button>
              </div>
              }
              { passwordChoosen &&
                <>
                  <span>
                    Votre mot de passe a &eacute;t&eacute; renouvel&eacute; avec succ&egrave;s
                    <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle', color: 'green' }}></i>
                  </span><br/><br/>
                  <span><Link to={`/login?role=${resultChoosePassword?.role}`}>Vous pouvez vous connecter</Link></span>
                </>
              }
              <div className="fr-col-3"></div>
            </div>
          }
        </div>
      </div>
    </>
  );


}

export default ForgottenPassword;
