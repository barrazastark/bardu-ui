import { Icon } from 'components';
import './Button.scss';

const blockName = 'button-wrapper';

const Button = ({ icon, children, type, onClick, className, disabled }) => {
  const _disabled = disabled ? 'disabled' : '';

  return (
    <button
      className={`${blockName} ${blockName}__${type} ${className} ${_disabled}`}
      disabled={disabled}
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

Button.defaultProps = {
  disabled: false,
  className: '',
  type: 'default',
};

export default Button;
