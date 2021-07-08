export default function user(state = null, action) {
  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
        flashMessage: true
      };
    case 'UPDATE_USER_EMAIL_FAILURE':
      return {
        patchError: action.error,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        userConnected: action.user,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        patchError: action.error,
        flashMessage: true
      };
    default:
      return state;
  }
}
