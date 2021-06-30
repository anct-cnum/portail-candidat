const initialState = {
  expandNav: false,
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return {
        ...state,
        expandNav: !state.expandNav
      };
    default:
      return state;
  }
}
