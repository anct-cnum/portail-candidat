import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import menu from './menuReducer';
import { combineReducers } from 'redux';
import conseiller from './conseillerReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  menu: menu,
  conseiller: conseiller
});

export default rootReducer;
