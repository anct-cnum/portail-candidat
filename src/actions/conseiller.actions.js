import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  get,
  patchInfoConseiller
};

function get(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.get(id)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_FAILURE', error };
  }

}
function patchInfoConseiller(info) {
  return dispatch => {
    dispatch(request());

    conseillerService.patchInfoConseiller(info)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PATCH_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'PATCH_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'PATCH_CONSEILLER_FAILURE', error };
  }
}
