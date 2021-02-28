import { useAuth } from 'hooks';
import './styles.scss';

const blockName = 'login-wrapper';

const Login = (props) => {
  const auth = useAuth();

  const handleClick = () => {
    auth.signin(() => {
      props.history.push('/app');
    });
  };

  return (
    <div className={blockName}>
      <div className={`${blockName}__login-box`}>
        <input type="rext" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button onClick={handleClick}>Conectarse</button>
      </div>
    </div>
  );
};

export default Login;
