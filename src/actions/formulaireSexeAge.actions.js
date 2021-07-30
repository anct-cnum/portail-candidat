import { conseillerService } from '../services/conseiller.service';

export const formulaireSexeAgeActions = {
  updateCandidat,
  verifyform,
};
function updateCandidat(candidat) {
  return dispatch => {
    dispatch(request());
    conseillerService.createSexeAge(candidat)
    .then(
      result => {
        dispatch(success(result.isUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_SEXE_AGE_REQUEST' };
  }
  function success(isUpdated) {
    return { type: 'POST_SEXE_AGE_SUCCESS', isUpdated };
  }
  function failure(error) {
    return { type: 'POST_SEXE_AGE_FAILURE', error };
  }
}

function verifyform(errors) {
  let hasErrors = false;
  errors.forEach(error => {
    if (error === true) {
      hasErrors = true;
    }
  });
  return { type: 'VERIFY_SONDAGE', hasErrors };
}
