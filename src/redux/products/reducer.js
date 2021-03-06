const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, payload],
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === payload._id) {
            product = payload;
          }
          return product;
        }),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
