import './DatePicker.scss';

const blockName = 'date-picker-wrapper';

const DatePicker = ({ onChange, value, label, name, width }) => {
  return (
    <div className={blockName} style={{ width }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type="date"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
