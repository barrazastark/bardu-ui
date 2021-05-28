import { Suspense, lazy, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useAuth } from 'hooks';
import { Switch, Route } from 'react-router-dom';
import {
  faSignOutAlt,
  faHome,
  faThList,
  faGem,
  faShoppingCart,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, Icon, MenuCard } from 'components';
import { getCategories } from '../../redux/categories/actions';
import { getProducts } from '../../redux/products/actions';
import { getPurchases } from '../../redux/purchases/actions';
import './Main.scss';
import { getDate } from './utils';

const Home = lazy(() => import('../Home'));
const Categories = lazy(() => import('../Categories'));
const Products = lazy(() => import('../Products'));
const Purchases = lazy(() => import('../Purchases'));
const Sales = lazy(() => import('../Sales'));

const blockName = 'main-wrapper';

export const BASE_PATH = '/app';

const initialDate = getDate(new Date());

const GemIcon = (props) => <FontAwesomeIcon icon={faGem} {...props} />;
const CategoryIcon = (props) => <FontAwesomeIcon icon={faThList} {...props} />;
const PurchasesIcon = (props) => (
  <FontAwesomeIcon icon={faShoppingCart} {...props} />
);
const SaleIcon = (props) => (
  <FontAwesomeIcon icon={faMoneyCheckAlt} {...props} />
);

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth();

  const path = useMemo(() => {
    return history.location.pathname;
  }, [history.location.pathname]);

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
    <>
      <div className={blockName}>
        <h1>
          <Link to="/app">
            <Icon icon={faHome} />
            Bienvenido
          </Link>
          <span className={`${blockName}__is-on`} />

          <Button
            className={`${blockName}__signout`}
            icon={faSignOutAlt}
            onClick={handleSignOut}
          />
          <span className={`${blockName}__date`}>{initialDate}</span>
        </h1>
        <div className={`${blockName}__content`}>
          <Suspense fallback={<p>Cargando</p>}>
            <Switch>
              <Route exact path={BASE_PATH} component={Home} />
              <Route path={`${BASE_PATH}/compras`} component={Purchases} />
              <Route path={`${BASE_PATH}/categorias`} component={Categories} />
              <Route path={`${BASE_PATH}/productos`} component={Products} />
              <Route path={`${BASE_PATH}/ventas`} component={Sales} />
            </Switch>
          </Suspense>
        </div>
      </div>
      <div className={`${blockName}__menu-bar`}>
        <MenuCard
          title="VENTAS"
          icon={SaleIcon}
          path={`${BASE_PATH}/ventas`}
          active={path.includes('ventas')}
          color="#ef476f"
          iconColor="white"
        />

        <MenuCard
          title="COMPRAS"
          icon={PurchasesIcon}
          path={`${BASE_PATH}/compras`}
          active={path.includes('compras')}
          color="#ffd166"
          iconColor="black"
        />
        <MenuCard
          title="PRODUCTOS"
          icon={GemIcon}
          path={`${BASE_PATH}/productos`}
          active={path.includes('productos')}
          color="#06d6a0"
          iconColor="white"
        />
        <MenuCard
          title="CATEGORIAS"
          icon={CategoryIcon}
          path={`${BASE_PATH}/categorias`}
          active={path.includes('categorias')}
          color="#118ab2"
          iconColor="white"
        />

        {/* 073b4c */}
      </div>
    </>
  );
};

export default Main;
