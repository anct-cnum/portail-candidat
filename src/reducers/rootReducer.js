import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import menu from './menuReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  menu: menu,
});

export default rootReducer;
