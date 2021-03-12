import { useProvideAuth } from 'hooks';
import { authContext as AuthContext } from 'context';

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
