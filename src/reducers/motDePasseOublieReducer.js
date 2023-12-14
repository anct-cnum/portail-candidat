const initialState = {
  loading: false,
  error: null,
};

export default function motDePasseOublie(state = initialState, action) {
  switch (action.type) {
    case 'SEND_EMAIL_REQUEST':
      return {
        loading: true,
        error: null,
      };
    case 'SEND_EMAIL_SUCCESS':
      return {
        loading: false,
        success: action.response.successResetPassword
      };
    case 'SEND_EMAIL_FAILURE':
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
