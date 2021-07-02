const initialState = {
  purchases: [],
  details: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_PURCHASES':
      return {
        ...state,
        purchases: payload,
      };
    case 'ADD_PURCHASE':
      return {
        ...state,
        purchases: [payload.inventory, ...state.purchases],
        details: {
          ...state.details,
          [payload.inventory._id]: payload.details,
        },
      };
    case 'GET_DETAILS':
      return {
        ...state,
        details: {
          ...state.details,
          [payload.invId]: payload.details,
        },
      };
    case 'DELETE_PURCHASE':
      return {
        ...state,
        purchases: state.purchases.filter((p) => p._id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
