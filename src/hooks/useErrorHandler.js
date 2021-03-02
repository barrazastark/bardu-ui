import { useState } from 'react';

export const useErrorHandler = () => {
  const [state, setState] = useState({ errorMessage: '' });

  const setError = (message) => {
    setState((prevState) => ({ ...prevState, errorMessage: message }));
  };

  return {
    state,
    setError,
  };
};
