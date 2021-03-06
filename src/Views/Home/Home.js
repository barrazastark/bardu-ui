import { MenuCard } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThList,
  faGem,
  faWarehouse,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { BASE_PATH } from 'Views/Main/Main';
import './Home.scss';

const blockName = 'home-wrapper';

const GemIcon = () => <FontAwesomeIcon icon={faGem} />;
const CategoryIcon = () => <FontAwesomeIcon icon={faThList} />;
const InventoryIcon = () => <FontAwesomeIcon icon={faWarehouse} />;
const SaleIcon = () => <FontAwesomeIcon icon={faMoneyCheckAlt} />;

const Home = () => {
  return (
    <div className={blockName}>
      <MenuCard title="VENTAS" icon={SaleIcon} path={`${BASE_PATH}/ventas`} />

      <MenuCard
        title="INVENTARIO"
        icon={InventoryIcon}
        path={`${BASE_PATH}/inventario`}
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
