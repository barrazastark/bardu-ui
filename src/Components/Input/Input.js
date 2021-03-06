import './Input.scss';

const blockName = 'input-wrapper';

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  className,
  type = 'text',
}) => {
  return (
    <div className={`${blockName} ${className}`}>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        value={type === 'number' && value === null ? 0 : value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
