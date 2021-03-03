import './Input.scss';

const blockName = 'input-wrapper';

const Input = ({ label, value, onChange, placeholder, name, className }) => {
  return (
    <div className={`${blockName} ${className}`}>
      {label && <label>{label}</label>}
      <input
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
