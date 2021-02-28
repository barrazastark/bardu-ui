import { Icon } from 'components';
import './Button.scss';

const blockName = 'button-wrapper';

const Button = ({ icon, children, type, onClick, className }) => {
  return (
    <button
      className={`${blockName} ${blockName}__${type} ${className}`}
      onClick={onClick}
    >
      {Boolean(icon) && <Icon icon={icon} />}
      {Boolean(children) && (
        <span className={`${Boolean(icon) ? 'with-icon' : ''}`}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Button;
