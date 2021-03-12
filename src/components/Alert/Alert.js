import './Alert.scss';

const blockName = 'alert-wrapper';

const Alert = ({ message, type }) => {
  const visible = message ? 'visible' : '';

  if (!message) {
    return null;
  }

  return (
    <div className={`${blockName} ${visible} ${blockName}__${type}`}>
      {message}
    </div>
  );
};

Alert.defaultProps = {
  message: '',
  type: 'success',
};

export default Alert;
