import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks';
import './styles.scss';

const blockName = 'login-wrapper';

const Login = (props) => {
  const auth = useAuth();
  const [state, setState] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    auth.signin(state, () => {
      props.history.push('/app');
    });
  };

  if (auth.user) {
    return <Redirect to="/app" />;
  }

  return (
    <div className={blockName}>
      <div className={`${blockName}__login-box`}>
        <input
          type="text"
          placeholder="Correo electrónico"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Conectarse</button>
      </div>
    </div>
  );
};

export default Login;
