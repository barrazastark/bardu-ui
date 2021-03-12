import './Modal.scss';
import { faTimes as Ico } from '@fortawesome/free-solid-svg-icons';
import { Icon, Button } from 'components';

const blockName = 'modal-wrapper';

const Modal = ({ isVisible, children, onCancel, onAccept }) => {
  if (!isVisible) return null;

  return (
    <div className={blockName}>
      <div className={`${blockName}__content`}>
        <Icon
          className={`${blockName}__close-icon`}
          icon={Ico}
          onClick={onCancel}
        />
        <div className={`${blockName}__body`}>{children}</div>

        <div className={`${blockName}__actions`}>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" onClick={onAccept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
