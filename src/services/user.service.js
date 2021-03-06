import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  verifyToken,
  choosePassword,
  updateInfosCandidat,
  confirmUserEmail,
  sendForgottenPasswordEmail
};

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = `${process.env.REACT_APP_API}/authentication`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'strategy': strategy,
      'name': username,
      'password': password
    })
  };

  return fetch(apiUrlAuth, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function verifyToken(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function choosePassword(token, password, typeEmail) {
  const apiUrlRoot = process.env.REACT_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'typeEmail': typeEmail
    })
  };

  let uri = `${apiUrlRoot}/users/choosePassword/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem('user');
}

function updateInfosCandidat(id, infos) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify(infos)
  };

  let uri = `${apiUrlRoot}/candidat/updateInfosCandidat/${id}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function confirmUserEmail(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
  };
  let uri = `${apiUrlRoot}/candidat/confirmation-email/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function sendForgottenPasswordEmail(username) {
  const apiUrlRoot = process.env.REACT_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': username
    })
  };

  let uri = `${apiUrlRoot}/users/sendForgottenPasswordEmail`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
