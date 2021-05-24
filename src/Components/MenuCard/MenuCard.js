import { Link } from 'react-router-dom';
import './MenuCard.scss';

const blockName = 'menu-card-wrapper';

const MenuCard = ({ title, icon: Icon, path }) => {
  return (
    <Link to={path} className={blockName}>
      <div className={`${blockName}__inner`}>
        <Icon />
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default MenuCard;
