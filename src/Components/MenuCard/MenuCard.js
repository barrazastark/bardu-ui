import { Link } from 'react-router-dom';
import './styles.scss';

const blockName = 'menu-card-wrapper';

const MenuCard = ({ title, icon: Icon, path }) => {
  return (
    <div className={blockName}>
      <Link to={path}>
        <Icon />
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default MenuCard;
