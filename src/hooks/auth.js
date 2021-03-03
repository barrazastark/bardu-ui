import { useState, useContext, useEffect } from 'react';
import { authContext } from 'context';
import client from 'services/client';

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      client
        .get('/users/auth')
        .then((response) => {
          setUser(response);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signin = (credentials, callback) => {
    setLoadingLogin(true);
    return client
      .post('/users/auth', credentials)
      .then((r) => {
        localStorage.setItem('jwt', r.data.token);
        setUser(r.data.user);
        callback();
      })
      .finally(() => {
        setLoadingLogin(false);
      });
  };

  const signout = () => {
    localStorage.setItem('jwt', '');
    setUser(null);
  };

  return {
    loadingLogin,
    loading,
    user,
    signin,
    signout,
  };
};

export const useAuth = () => {
  return useContext(authContext);
};
