import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import menu from './menuReducer';
import { combineReducers } from 'redux';
import conseiller from './conseillerReducer';
import user from './userReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';
import geoReducer from './geoReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  menu: menu,
  conseiller: conseiller,
  user: user,
  motDePasseOublie: motDePasseOublieReducer,
  geoDonneesCodePostal: geoReducer
});

export default rootReducer;
