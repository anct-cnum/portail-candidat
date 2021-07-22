import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  get,
  uploadCurriculumVitae
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

function uploadCurriculumVitae(fileCV) {

  return dispatch => {
    dispatch(request());

    conseillerService.uploadCurriculumVitae(fileCV)
    .then(
      data => dispatch(success(data.isUploaded)),
      error => dispatch(failure(error))
    );
  };
  function request() {
    return { type: 'POST_CURRICULUM_VITAE_REQUEST' };
  }
  function success(isUploaded) {
    return { type: 'POST_CURRICULUM_VITAE_SUCCESS', isUploaded };
  }
  function failure(error) {
    return { type: 'POST_CURRICULUM_VITAE_FAILURE', error };
  }
}
