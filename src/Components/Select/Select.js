import './Select.scss';

const blockName = 'select-wrapper';

const Select = ({ name, value, options, label, onChange }) => {
  return (
    <div className={blockName}>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {!value && <option selected />}
        {options.map((op) => (
          <option key={op.id} value={op.id}>
            {op.display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
