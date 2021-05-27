import { Link } from 'react-router-dom';
import './MenuCard.scss';

const blockName = 'menu-card-wrapper';

const MenuCard = ({ title, icon: Icon, path, active }) => {
  return (
    <Link to={path} className={`${blockName} ${active ? 'active' : ''} `}>
      <div className={`${blockName}__inner`}>
        <Icon />
      </div>
      <span>{title}</span>
    </Link>
  );
};

export default MenuCard;
