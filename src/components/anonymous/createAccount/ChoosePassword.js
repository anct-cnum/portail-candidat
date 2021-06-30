import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userActions } from '../../../actions';
import Header from '../../common/Header';

function ChoosePassword({ match }) {

  const [inputs, setInputs] = useState({
    password: '',
    confirmPassword: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { password, confirmPassword } = inputs;
  const token = match.params.token;
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const user = useSelector(state => state.createAccount.user);
  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const error = useSelector(state => state.createAccount.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const checkComplexity = password => password.length >= 6;

  function handleSubmit() {
    setSubmitted(true);
    if (password && confirmPassword === password && checkComplexity(password)) {
      dispatch(userActions.choosePassword(token, password, 'bienvenue'));
    }
  }

  return (
    <div>
      <Header/>
      <div className="fr-container fr-mt-3w">
        <div className="fr-grid-row">
          <div className="fr-col-3"></div>
          <div className="Login fr-col-6 fr-p-5w">
            <h2>Choisissez votre mot de passe<br /><span className="fr-fi-account-fill fr-fi--xl" /></h2>

            { verifyingToken &&
              <span>Chargement...</span>
            }

            { tokenVerified === false &&
              <span>Désolé mais le lien est invalide.</span>
            }

            { tokenVerified && !passwordChoosen &&
              <div>
                <div>
                  {error && <span>{error.error ? error.error : 'Une erreur s\'est produite'}</span>}
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Votre adresse email:</label>
                  <span>{user.name}</span>
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
                  { password && !checkComplexity(password) &&
                    <span>Le mot de passe doit contenir au moins 6 caractères.</span>
                  }
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Mot de passe (confirmation)</label>
                  <input name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className={(password !== confirmPassword ? ' is-invalid fr-input' : 'fr-input')} />
                  {password !== confirmPassword &&
                    <div className="invalid">Mot de passe doit être identique</div>
                  }
                </div>

                {choosingPassword && <span>Chargement...</span>}
                <button className="fr-btn" onClick={handleSubmit}>Valider</button>
              </div>
            }

            { passwordChoosen &&
              <span>Votre compte a été créé avec succès. <Link to={`/login`}>Vous pouvez vous connecter</Link>.</span>
            }

            <div className="fr-col-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChoosePassword.propTypes = {
  match: PropTypes.object
};

export default ChoosePassword;
