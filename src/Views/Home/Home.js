import { MenuCard } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThList,
  faGem,
  faShoppingCart,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { BASE_PATH } from 'Views/Main/Main';
import './Home.scss';

const blockName = 'home-wrapper';

const GemIcon = () => <FontAwesomeIcon icon={faGem} />;
const CategoryIcon = () => <FontAwesomeIcon icon={faThList} />;
const PurchasesIcon = () => <FontAwesomeIcon icon={faShoppingCart} />;
const SaleIcon = () => <FontAwesomeIcon icon={faMoneyCheckAlt} />;

const Home = () => {
  return (
    <div className={blockName}>
      <MenuCard title="VENTAS" icon={SaleIcon} path={`${BASE_PATH}/ventas`} />

      <MenuCard
        title="COMPRAS"
        icon={PurchasesIcon}
        path={`${BASE_PATH}/compras`}
      />
      <MenuCard
        title="PRODUCTOS"
        icon={GemIcon}
        path={`${BASE_PATH}/productos`}
      />
      <MenuCard
        title="CATEGORIAS"
        icon={CategoryIcon}
        path={`${BASE_PATH}/categorias`}
      />
    </div>
  );
};
export default Home;
