export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        loading: true
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    case 'POST_SEXE_AGE_REQUEST':
      return {
        loading: true
      };
    case 'POST_SEXE_AGE_SUCCESS':
      return {
        ...state,
        isUpdated: action.isUpdated
      };
    case 'POST_SEXE_AGE_FAILURE':
      return {
        error: action.error,
        isUpdated: false
      };
    case 'POST_CURRICULUM_VITAE_REQUEST':
      return {
        loading: true
      };
    case 'POST_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isUploaded: action.isUploaded
      };
    case 'POST_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        uploadError: action.error,
        isUploaded: false
      };
    case 'GET_CURRICULUM_VITAE_REQUEST':
      return {
        loading: true,
        isDownloaded: false
      };
    case 'GET_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        blob: action.data,
        isDownloaded: action.download
      };
    case 'GET_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        downloadError: action.error,
        isDownloaded: false
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    default:
      return state;
  }
}
