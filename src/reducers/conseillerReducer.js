const initialState = {
  uploading: false,
  downloadError: false,
  deleteError: false,
  deleteCandidatureError: false,
  error: false,
};

export default function conseiller(state = initialState, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller,
        loading: false
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case 'POST_SEXE_AGE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'POST_DISPO_CANDIDAT_REQUEST':
      return {
        ...state,
        loading: true,
        isUpdateStatutDispo: false,
        error: false
      };
    case 'POST_DISPO_CANDIDAT_SUCCESS':
      return {
        ...state,
        'conseiller.disponible': action.conseiller.disponible,
        'loading': false,
        'isUpdateStatutDispo': true,
      };
    case 'POST_DISPO_CANDIDAT_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'POST_SEXE_AGE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated,
        loading: false
      };
    case 'POST_SEXE_AGE_FAILURE':
      return {
        error: action.error,
        isUpdated: false,
        loading: false
      };
    case 'POST_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        loading: true,
        isUploaded: false,
      };
    case 'POST_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isUploaded: action.isUploaded,
        loading: false
      };
    case 'POST_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        uploadError: action.error,
        isUploaded: false,
        loading: false
      };
    case 'GET_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        loading: true,
        isDownloaded: false
      };
    case 'GET_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        blob: action.data,
        isDownloaded: action.download,
        loading: false,
      };
    case 'GET_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        downloadError: action.error,
        loading: false,
        isDownloaded: false
      };
    case 'DELETE_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        isUploaded: false,
        isDeleted: false,
        deleteError: false,
        loading: true
      };
    case 'DELETE_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isDeleted: true,
        deleteError: false,
        conseiller: { ...state.conseiller, cv: null },
        loading: false
      };
    case 'DELETE_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        deleteError: action.error,
        loading: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    case 'DELETE_CANDIDATURE_REQUEST':
      return {
        ...state,
        loading: true,
        deleteCandidatureError: false
      };
    case 'DELETE_CANDIDATURE_SUCCESS':
      return {
        ...state,
        deleteSuccess: action.data,
        loading: false
      };
    case 'DELETE_CANDIDATURE_FAILURE':
      return {
        ...state,
        deleteCandidatureError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
