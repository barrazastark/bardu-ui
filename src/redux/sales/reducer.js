const intitialState = {
  sales: [],
  details: {},
};

const reducer = (state = intitialState, { type, payload }) => {
  switch (type) {
    case 'ADD_SALE':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
