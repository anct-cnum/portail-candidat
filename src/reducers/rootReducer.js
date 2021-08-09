import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import menu from './menuReducer';
import { combineReducers } from 'redux';
import conseiller from './conseillerReducer';
import user from './userReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  menu: menu,
  conseiller: conseiller,
  user: user,
  motDePasseOublie: motDePasseOublieReducer
});

export default rootReducer;
