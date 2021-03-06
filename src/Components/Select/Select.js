import { useMemo } from 'react';
import './Select.scss';

const blockName = 'select-wrapper';

const Select = ({ name, value, options, label, onChange }) => {
  const displayedValue = useMemo(() => {
    if (!value) {
      return '';
    }

    return options.find((op) => op.id === value).display;
  }, [value, options]);

  return (
    <div className={blockName}>
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e, displayedValue)}
      >
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
