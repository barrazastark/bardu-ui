import { useState } from 'react';
import { Table, Button } from 'components';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Categories.scss';
import { Drawer, Modal } from 'components';
import Form from './Form';
import data from './data';

const blockName = 'categories-wrapper';

const headers = [
  {
    key: 'name',
    display: 'Nombre',
  },
];

const Categories = () => {
  const [state, setState] = useState({
    isEdit: false,
    name: '',
    drawerOpen: false,
    itemToRemove: null,
  });

  const { isEdit, name, drawerOpen, itemToRemove } = state;

  const handleFormChange = (e) => {
    setState((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const handleCancel = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: false, name: '' }));
  };

  const handleRemove = (item) => {
    setState((prevState) => ({ ...prevState, itemToRemove: item.name }));
  };

  const handleEdit = (item) => {
    setState((prevState) => ({
      ...prevState,
      name: item.name,
      drawerOpen: true,
      isEdit: true,
    }));
  };

  const handleAcceptDrawer = () => {};

  const handleCancelModal = () => {
    setState((prevState) => ({ ...prevState, itemToRemove: null }));
  };

  const handleAcceptModal = () => {
    setState((prevState) => ({ ...prevState, itemToRemove: null }));
  };

  return (
    <div className={blockName}>
      <h3>
        Categorias ({data.length}){' '}
        <Button
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              drawerOpen: true,
              isEdit: false,
            }))
          }
          icon={faPlusCircle}
          type="primary"
        >
          Agregar categoria
        </Button>
      </h3>
      <Table
        data={data}
        headers={headers}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
      <Drawer
        isVisible={drawerOpen}
        title={`${isEdit ? 'Editar' : 'Agregar'} categoria`}
        onCancel={handleCancel}
        onAccept={handleAcceptDrawer}
        isButtonDisabled={!Boolean(name)}
      >
        <Form data={name} onChange={handleFormChange} />
      </Drawer>
      <Modal
        isVisible={Boolean(itemToRemove)}
        onCancel={handleCancelModal}
        onAccept={handleAcceptModal}
      >
        <p>
          Estas seguto de borrar el siguiente item ?{' '}
          <span className={`${blockName}__bold-text`}>{itemToRemove}</span>
        </p>
      </Modal>
    </div>
  );
};

export default Categories;
