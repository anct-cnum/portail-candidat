import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import menu from './menuReducer';
import { combineReducers } from 'redux';
import conseiller from './conseillerReducer';
import user from './userReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';
import alerteEtSpinnerReducer from './alerteEtSpinnerReducer';
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  menu: menu,
  conseiller: conseiller,
  user: user,
  motDePasseOublie: motDePasseOublieReducer,
  alerteEtSpinner: alerteEtSpinnerReducer
});

export default rootReducer;
