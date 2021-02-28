import { MenuCard } from 'Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const blockName = 'home-wrapper';

const CategoryIcon = () => <FontAwesomeIcon icon={faThList} />;

const Home = () => {
  return (
    <div className={blockName}>
      <MenuCard title="Categorias" icon={CategoryIcon} path="/app/categorias" />
    </div>
  );
};
export default Home;
