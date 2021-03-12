import { Icon, Button, Loader } from 'components';
import { faTimes as Ico } from '@fortawesome/free-solid-svg-icons';

import './Drawer.scss';

const blockName = 'drawer-wrapper';

const Drawer = ({
  isVisible,
  title,
  onCancel,
  onAccept,
  children,
  isButtonDisabled,
  isLoading,
  messageLoader,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={blockName}>
      <div className={`${blockName}__content`}>
        {isLoading && (
          <div className={`${blockName}__loading-wrapper`}>
            <Loader message={messageLoader} />
          </div>
        )}

        <Icon
          className={`${blockName}__close-icon`}
          icon={Ico}
          onClick={onCancel}
        />
        <h4>{title}</h4>
        <div className={`${blockName}__body`}>{children}</div>
        <div className={`${blockName}__actions`}>
          <Button type="primary" onClick={onAccept} disabled={isButtonDisabled}>
            Aceptar
          </Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
