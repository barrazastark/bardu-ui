import { Suspense, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'hooks';
import { Switch, Route } from 'react-router-dom';
import './styles.scss';

const Home = lazy(() => import('../Home'));

const blockName = 'main-wrapper';

const BASE_PATH = '/app';

const Main = () => {
  const auth = useAuth();

  if (auth.user === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={blockName}>
      <Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route exact path={BASE_PATH} component={Home} />
          <Route
            exact
            path={`${BASE_PATH}/categorias`}
            component={() => <p>Categorias</p>}
          />
        </Switch>
      </Suspense>
    </div>
  );
};
export default Main;
