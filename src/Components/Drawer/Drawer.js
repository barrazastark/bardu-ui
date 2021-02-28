import { Icon, Button } from 'components';
import { faTimes as Ico } from '@fortawesome/free-solid-svg-icons';

import './Drawer.scss';

const blockName = 'drawer-wrapper';

const Drawer = ({ isVisible, title, onCancel, onAccept, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={blockName}>
      <div className={`${blockName}__content`}>
        <Icon
          className={`${blockName}__close-icon`}
          icon={Ico}
          onClick={onCancel}
        />
        <h4>{title}</h4>
        <div className={`${blockName}__body`}>{children}</div>
        <div className={`${blockName}__actions`}>
          <Button type="primary" onClick={onAccept}>
            Aceptar
          </Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
