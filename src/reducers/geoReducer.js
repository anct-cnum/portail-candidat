export default function geoDonneeCodeGeographique(state = null, action) {
  switch (action.type) {
    case 'GET_GEO_REQUEST':
      return {
        ...state
      };
    case 'GET_GEO_SUCCESS':
      return {
        successGeo: action.cp
      };
    case 'GET_GEO_FAILURE':
      return {
        errorGeo: action.error
      };
    default:
      return state;
  }
}
