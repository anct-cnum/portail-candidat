import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import Header from '../common/Header';
import { useNavigate, useParams } from 'react-router-dom';

function ConfirmationEmailPro() {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const tokenVerifiedOK = useSelector(state => state.user?.isEmailPro);
  const tokenVerifiedError = useSelector(state => state.user?.patchError);

  useEffect(() => {
    dispatch(userActions.confirmUserEmailPro(token));
    setTimeout(() => {
      navigate('/mon-espace');
    }, 7000);
  }, []);

  return (
    <div>
      <Header/>
      <div className="">
        <div className="fr-grid-row fr-grid-row--center fr-mt-8w">
          <div style={{ width: '50%', textAlign: 'center' }}>
            {tokenVerifiedOK &&
            <div>
              <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
              </p>
              <h4>Nous allons vous rediriger vers votre espace candidat....</h4>
            </div>
            }
            {tokenVerifiedError &&
                  <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a échoué, <br/>
                  veuillez réessayer plus tard
                  </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationEmailPro;
