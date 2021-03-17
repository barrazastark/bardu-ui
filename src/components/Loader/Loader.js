import './Loader.scss';

const blockName = 'loader-wrapper';

const Loader = ({ message, size, color }) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div style={{ fontSize: size }} className={blockName} />
      <p
        style={{
          fontSize: size,
          left: -(size * 2),
          position: 'absolute',
          top: size * 3,
        }}
      >
        {message}
      </p>
    </div>
  );
};

Loader.defaultProps = {
  size: 25,
  message: '',
};

export default Loader;
