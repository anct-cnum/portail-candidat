const initialState = { uploading: false, downloadError: false, loading: false, deleteError: false, deleteCandidatureError: false };

export default function conseiller(state = initialState, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        ...state,
        loading: true,
        deleteCandidatureError: false
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller,
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'POST_SEXE_AGE_REQUEST':
      return {
        ...state,
        loading: true
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
        isUpdated: false
      };
    case 'POST_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        uploading: true,
        isUploaded: false,
      };
    case 'POST_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isUploaded: action.isUploaded,
        uploading: false
      };
    case 'POST_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        uploadError: action.error,
        isUploaded: false,
        uploading: false
      };
    case 'GET_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        downloading: true,
        isDownloaded: false
      };
    case 'GET_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        blob: action.data,
        isDownloaded: action.download,
        downloading: false,
      };
    case 'GET_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        downloadError: action.error,
        downloading: false,
        isDownloaded: false
      };
    case 'DELETE_CURRICULUM_VITAE_REQUEST':
      return {
        ...state,
        isDeleted: false,
        deleteError: false,
        loadingDeleteCv: true
      };
    case 'DELETE_CURRICULUM_VITAE_SUCCESS':
      return {
        ...state,
        isDeleted: true,
        deleteError: false,
        loadingDeleteCv: false
      };
    case 'DELETE_CURRICULUM_VITAE_FAILURE':
      return {
        ...state,
        deleteError: action.error,
        loadingDeleteCv: false
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
