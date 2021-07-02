const intitialState = {
  sales: [],
  details: {},
};

const reducer = (state = intitialState, { type, payload }) => {
  switch (type) {
    case 'ADD_SALE':
      return {
        ...state,
        sales: [payload.sale, ...state.sales],
        details: {
          ...state.details,
          [payload.sale._id]: payload.details,
        },
      };
    case 'GET_SALES':
      return {
        ...state,
        sales: payload,
      };
    default:
      return state;
  }
};

export default reducer;
