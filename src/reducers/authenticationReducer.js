let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, error: null } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      return {
        error: action.error
      };
    case 'CLEAR_ERROR':
      return {
        error: null
      };
    case 'LOGOUT':
      return {};
    case 'VERIFY_CODE_CONNEXION_REQUEST':
      return {
        ...state,
        verifyingCode: true,
        messageCodeVerified: '',
        errorVerifyingCode: '',
      };
    case 'VERIFY_CODE_CONNEXION_SUCCESS':
      return {
        ...state,
        verifyingCode: false,
        messageCodeVerified: action.result.messageVerificationCode,
      };
    case 'VERIFY_CODE_CONNEXION_FAILURE':
      return {
        ...state,
        verifyingCode: false,
        errorVerifyingCode: action.error,
      };
    default:
      return state;
  }
}
