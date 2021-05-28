import { Link } from 'react-router-dom';
import './MenuCard.scss';

const blockName = 'menu-card-wrapper';

const MenuCard = ({ title, icon: Icon, path, active, color, iconColor }) => {
  return (
    <Link
      to={path}
      className={`${blockName} ${active ? 'active' : ''} `}
      style={{ backgroundColor: color }}
    >
      <div className={`${blockName}__inner`}>
        <Icon color={iconColor} style={{ color: iconColor }} />
      </div>
      <span>{title}</span>
    </Link>
  );
};

export default MenuCard;
