import { useState, useEffect, useMemo } from 'react';
import { Table, Button } from 'components';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Categories.scss';
import { Drawer, Modal, Input } from 'components';
import Form from './Form';
import client from 'services/client';

const blockName = 'categories-wrapper';

const headers = [
  {
    key: 'name',
    display: 'Nombre',
  },
  {
    key: 'description',
    display: 'Descripción',
  },
];

const initialState = {
  isEdit: false,
  name: '',
  description: '',
  drawerOpen: false,
  itemToRemove: null,
  itemToEdit: null,
  data: [],
  search: '',
};

const Categories = () => {
  const [state, setState] = useState(initialState);
  const {
    isEdit,
    name,
    description,
    drawerOpen,
    itemToRemove,
    itemToEdit,
    data,
    search,
  } = state;

  useEffect(() => {
    client.get('/categories').then((r) => {
      setState((prevState) => ({ ...prevState, data: r.data }));
    });
  }, []);

  const handleFormChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: false,
      name: '',
      description,
    }));
  };

  const handleRemove = (item) => {
    setState((prevState) => ({ ...prevState, itemToRemove: item }));
  };

  const handleEdit = (item) => {
    setState((prevState) => ({
      ...prevState,
      name: item.name,
      description: item.description,
      itemToEdit: item,
      drawerOpen: true,
      isEdit: true,
    }));
  };

  const handleAcceptDrawer = async () => {
    if (!isEdit) {
      const response = await client.post('/categories', { name, description });
      setState((prevState) => ({
        ...prevState,
        drawerOpen: false,
        name: '',
        description: '',
        data: [...prevState.data, response.data],
      }));
    } else {
      await client.put(`/categories/${itemToEdit._id}`, {
        name,
        description,
      });

      const newData = state.data.map((category) => {
        if (category._id === itemToEdit._id) {
          category.name = name;
          category.description = description;
        }
        return category;
      });

      setState((prevState) => ({
        ...prevState,
        drawerOpen: false,
        name: '',
        description: '',
        data: newData,
      }));
    }
  };

  const handleCancelModal = () => {
    setState((prevState) => ({ ...prevState, itemToRemove: null }));
  };

  const handleAcceptModal = async () => {
    await client.delete(`/categories/${itemToRemove._id}`);
    const newData = data.filter(
      (category) => category._id !== itemToRemove._id,
    );
    setState((prevState) => ({
      ...prevState,
      itemToRemove: null,
      data: newData,
    }));
  };

  const handleSearch = (e) => {
    setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  const filteredData = useMemo(() => {
    const crit = search.toUpperCase();

    return data.filter((d) => {
      return (
        d.name.toUpperCase().includes(crit) ||
        d.description.toUpperCase().includes(crit)
      );
    });
  }, [search, data]);

  return (
    <div className={blockName}>
      <h3>
        Categorias ({data.length}){' '}
        <Input
          type="text"
          placeholder="Buscar"
          className={`${blockName}__search`}
          value={search}
          onChange={handleSearch}
        />
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
        data={filteredData}
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
        <Form data={{ name, description }} onChange={handleFormChange} />
      </Drawer>
      <Modal
        isVisible={Boolean(itemToRemove)}
        onCancel={handleCancelModal}
        onAccept={handleAcceptModal}
      >
        <p>
          Estas seguro de borrar la siguiente categoría ?{' '}
          {itemToRemove && (
            <span className={`${blockName}__bold-text`}>
              {itemToRemove.name}
            </span>
          )}
        </p>
      </Modal>
    </div>
  );
};

export default Categories;
