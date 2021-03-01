import './Input.scss';

const blockName = 'input-wrapper';

const Input = ({ label, value, onChange, placeholder, name }) => {
  return (
    <div className={blockName}>
      <label>{label}</label>
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
