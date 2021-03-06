const intialState = {
  categories: [],
};

const reducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: payload,
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case 'EDIT_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === payload._id) {
            category.name = payload.name;
            category.deacription = payload.deacription;
          }
          return category;
        }),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
