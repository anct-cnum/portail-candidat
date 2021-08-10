export default function authentication(state = {}, action) {
  switch (action.type) {
    case 'VERIFY_TOKEN_REQUEST':
      return {
        verifyingToken: true,
        user: action.user
      };
    case 'VERIFY_TOKEN_SUCCESS':
      console.log('VERIFY_TOKEN_SUCCESS:', action.resultVerifyToken);
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
      console.log('CHOOSE_PASSWORD_SUCCESS:', action.resultChoosePassword);
      return {
        passwordChoosen: true,
        resultChoosePassword: action.resultChoosePassword
      };
    case 'CHOOSE_PASSWORD_FAILURE':
      return {
        passwordChoosen: false,
        error: action.error
      };
    default:
      return state;
  }
}
