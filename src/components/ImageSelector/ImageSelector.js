import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'components';
import './ImageSelector.scss';

const blockName = 'image-selector-wrapper';

const ImageSelector = ({ image, onChange, label, name }) => {
  return (
    <div className={blockName}>
      <span>{label}</span>
      <label htmlFor={name}>
        Elige imagen...
        <Icon icon={faImage} />
      </label>
      <input
        id={name}
        type="file"
        name={name}
        onChange={onChange}
        placeholder="Elige"
      />
      {!image && (
        <div className={`${blockName}__no-image`}>
          No hay imagen seleccionada
        </div>
      )}
      {image && <img src={image} alt="Imagen" />}
    </div>
  );
};

export default ImageSelector;
