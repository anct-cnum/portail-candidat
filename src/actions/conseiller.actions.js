import download from 'downloadjs';
import { conseillerService } from '../services/conseiller.service.js';
import { userService } from '../services/user.service.js';

export const conseillerActions = {
  get,
  uploadCurriculumVitae,
  getCurriculumVitae,
  deleteCurriculumVitae,
  resetCVFile,
  deleteCandidature,
  updateDisponibiliteCandidat
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

function getCurriculumVitae(id, candidat) {

  return dispatch => {
    dispatch(request());

    conseillerService.getCurriculumVitae(id)
    .then(
      data => dispatch(success(data, download(data, candidat?.nom + '_' + candidat?.prenom + '.' + candidat?.cv?.extension))),
      error => dispatch(failure(error))
    );
  };
  function request() {
    return { type: 'GET_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_CURRICULUM_VITAE_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_CURRICULUM_VITAE_FAILURE', error };
  }
}

function updateDisponibiliteCandidat(idConseiller, disponible) {

  return dispatch => {
    dispatch(request());
    conseillerService.updateDisponibiliteCandidat(idConseiller, disponible)
    .then(
      result => {
        dispatch(success(result));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_DISPO_CANDIDAT_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'POST_DISPO_CANDIDAT_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'POST_DISPO_CANDIDAT_FAILURE', error };
  }
}

function deleteCurriculumVitae(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.deleteCurriculumVitae(id)
    .then(
      data => dispatch(success(data)),
      error => dispatch(failure(error))
    );
  };
  function request() {
    return { type: 'DELETE_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data) {
    return { type: 'DELETE_CURRICULUM_VITAE_SUCCESS', data };
  }
  function failure(error) {
    return { type: 'DELETE_CURRICULUM_VITAE_FAILURE', error };
  }
}

function resetCVFile() {
  return { type: 'RESET_FILE' };
}

function deleteCandidature(motif, conseiller, username, password) {
  return dispatch => {
    dispatch(request());
    userService.login(username, password).then(
      () => {
        conseillerService.deleteCandidature(motif, conseiller).then(
          data => {
            dispatch(success(data));
            window.location.pathname = '/candidature-supprimee';
          },
          error => {
            dispatch(failure(error));
          }
        );
      },
      error => {
        dispatch(failure(error.error));
      }
    );

  };

  function request() {
    return { type: 'DELETE_CANDIDATURE_REQUEST' };
  }
  function success(data) {
    return { type: 'DELETE_CANDIDATURE_SUCCESS', data };
  }
  function failure(error) {
    return { type: 'DELETE_CANDIDATURE_FAILURE', error };
  }
}
