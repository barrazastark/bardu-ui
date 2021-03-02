import { useState, useContext, useEffect } from 'react';
import { authContext } from 'context';
import client from 'services/client';

const Auth = {
  signout(cb) {
    setTimeout(cb, 100);
  },
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setTimeout(() => {
        setLoading(false);
        setUser('user');
      }, 2000);
    } else {
      setLoading(false);
    }
  }, []);

  const signin = (credentials, callback) => {
    return client.post('/users/auth', credentials).then((r) => {
      localStorage.setItem('jwt', r.data.token);
      setUser('loggedIn');
      callback();
    });
  };

  const signout = (cb = () => {}) => {
    return Auth.signout(() => {
      localStorage.setItem('jwt', null);
      setUser(null);
      cb();
    });
  };

  const reportError = (message) => {
    setErrorMessage(message);
  };

  return {
    reportError,
    errorMessage,
    loading,
    user,
    signin,
    signout,
  };
};

export const useAuth = () => {
  return useContext(authContext);
};
