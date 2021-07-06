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
    case 'PATCH_CONSEILLER_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'PATCH_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller,
        flashMessage: true
      };
    case 'PATCH_CONSEILLER_FAILURE':
      return {
        patchError: action.error,
        flashMessage: true
      };
    default:
      return state;
  }
}
