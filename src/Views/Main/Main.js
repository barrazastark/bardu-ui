import { Suspense, lazy } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useAuth } from 'hooks';
import { Switch, Route } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import './Main.scss';

const Home = lazy(() => import('../Home'));
const Categories = lazy(() => import('../Categories'));

const blockName = 'main-wrapper';

export const BASE_PATH = '/app';

const Main = () => {
  const auth = useAuth();

  console.log(auth);

  const handleSignOut = () => {
    auth.signout();
  };

  if (auth.loading) {
    return <p>Cargando</p>;
  }

  if (!auth.user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={blockName}>
      <h1>
        <Link to="/app">Bardu admin</Link>
        <Button
          className={`${blockName}__signout`}
          icon={faSignOutAlt}
          onClick={handleSignOut}
        />
      </h1>

      <Suspense fallback={<p>Cargando</p>}>
        <Switch>
          <Route exact path={BASE_PATH} component={Home} />
          <Route
            exact
            path={`${BASE_PATH}/categorias`}
            component={Categories}
          />
        </Switch>
      </Suspense>
    </div>
  );
};
export default Main;
