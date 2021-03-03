import { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks';
import './Login.scss';

const blockName = 'login-wrapper';

const Login = (props) => {
  const emailRef = useRef(null);
  const auth = useAuth();
  const [state, setState] = useState({ email: '', password: '' });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && state.password && state.email) {
      handleClick();
    }
  };

  const buttonDisabled =
    !Boolean(state.email && state.password) || auth.loadingLogin;

  if (auth.user) {
    return <Redirect to="/app" />;
  }

  return (
    <div className={blockName}>
      <div className={`${blockName}__login-box`}>
        <input
          ref={emailRef}
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
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={buttonDisabled}
          onClick={handleClick}
          className={`${buttonDisabled ? 'disabled' : ''}`}
        >
          Conectarse
        </button>
      </div>
    </div>
  );
};

export default Login;
