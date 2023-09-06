import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('@gouvfr/dsfr/dist/dsfr/dsfr.module', () => jest.fn());
jest.mock('@gouvfr/dsfr/dist/dsfr/dsfr.nomodule', () => jest.fn());

const initialState = {
  alerteEtSpinner: {
    isLoading: false,
  },
  authentication: {
    loggedIn: false,
    user: null,
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

it('App render without crashing', () => {
  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
});
