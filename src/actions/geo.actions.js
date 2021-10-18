import { conseillerService } from '../services/conseiller.service';

export const getGeoActions = {
  getDonneesCodePostal
};
function getDonneesCodePostal(cp) {
  return dispatch => {
    dispatch(request());
    conseillerService.getDonneesCodePostal(cp)
    .then(
      code => {
        dispatch(success(code));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'GET_GEO_REQUEST' };
  }
  function success(cp) {
    return { type: 'GET_GEO_SUCCESS', cp };
  }
  function failure(error) {
    return { type: 'GET_GEO_FAILURE', error };
  }
}
