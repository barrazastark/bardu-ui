import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { useAuth } from 'hooks';
import { Switch, Route } from 'react-router-dom';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { Button, Icon } from 'components';
import { getCategories } from '../../redux/categories/actions';
import { getProducts } from '../../redux/products/actions';
import { getPurchases } from '../../redux/purchases/actions';
import './Main.scss';
import { getDate } from './utils';

const Home = lazy(() => import('../Home'));
const Categories = lazy(() => import('../Categories'));
const Products = lazy(() => import('../Products'));
const Purchases = lazy(() => import('../Purchases'));

const blockName = 'main-wrapper';

export const BASE_PATH = '/app';

const initialDate = getDate(new Date());

const Main = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getPurchases());
  }, [dispatch]);

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
        <Link to="/app">
          <Icon icon={faHome} />
          Bienvendio
        </Link>
        <span className={`${blockName}__is-on`} />

        <Button
          className={`${blockName}__signout`}
          icon={faSignOutAlt}
          onClick={handleSignOut}
        />
        <span className={`${blockName}__date`}>{initialDate}</span>
      </h1>

      <Suspense fallback={<p>Cargando</p>}>
        <Switch>
          <Route exact path={BASE_PATH} component={Home} />
          <Route path={`${BASE_PATH}/compras`} component={Purchases} />
          <Route path={`${BASE_PATH}/categorias`} component={Categories} />
          <Route path={`${BASE_PATH}/productos`} component={Products} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Main;
