export default function user(state = null, action) {
  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        patchError: false,
        userUpdated: false
      };
    case 'UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        userUpdated: true,
        sendMail: action.user.sendmail,
        loading: false,
      };
    case 'UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        patchError: action.error,
        loading: false
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        patchError: false
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        userConnected: action.user,
        loading: false,
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        patchError: action.error,
        loading: false
      };
    default:
      return state;
  }
}
