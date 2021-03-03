const intialState = {
  message: {
    text: '',
    type: 'success',
  },
};

const reducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MESSAGE':
      return {
        message: {
          text: payload.message,
          type: payload.type,
        },
      };

    default:
      return state;
  }
};

export default reducer;
