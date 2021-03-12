import { Link } from 'react-router-dom';
import './MenuCard.scss';

const blockName = 'menu-card-wrapper';

const MenuCard = ({ title, icon: Icon, path }) => {
  return (
    <Link to={path} className={blockName}>
      <Icon />
      <span>{title}</span>
    </Link>
  );
};

export default MenuCard;
