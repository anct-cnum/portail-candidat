export default function authentication(state = {}, action) {
  switch (action.type) {
    case 'VERIFY_TOKEN_REQUEST':
      return {
        verifyingToken: true,
        user: action.user
      };
    case 'VERIFY_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        resultVerifyToken: action.resultVerifyToken
      };
    case 'VERIFY_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        error: action.error
      };
    case 'CHOOSE_PASSWORD_REQUEST':
      return {
        choosingPassword: true,
        user: action.user
      };
    case 'CHOOSE_PASSWORD_SUCCESS':
      return {
        passwordChoosen: true,
        resultChoosePassword: action.resultChoosePassword
      };
    case 'CHOOSE_PASSWORD_FAILURE':
      return {
        passwordChoosen: false,
        error: action.error
      };
    case 'VERIFY_CODE_CONNEXION_REQUEST':
      return {
        ...state,
        verifyingCode: true,
        codeVerified: false,
        errorVerifyingCode: '',
      };
    case 'VERIFY_CODE_CONNEXION_SUCCESS':
      return {
        ...state,
        verifyingCode: false,
        codeVerified: true,
        messageCodeVerified: action.result.messageVerificationCode,
      };
    case 'VERIFY_CODE_CONNEXION_FAILURE':
      return {
        ...state,
        verifyingCode: false,
        errorVerifyingCode: action.error.error ? action.error.error : action.error,
      };
    default:
      return state;
  }
}
