const initialState = {
  purchases: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_PUSCHASE':
      return {
        ...state,
        purchases: [...state.purchases, payload],
      };
    default:
      return state;
  }
};

export default reducer;
