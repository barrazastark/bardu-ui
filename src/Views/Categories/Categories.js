import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'components';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Categories.scss';
import { Drawer, Modal, Input } from 'components';
import Form from './Form';

import {
  addCategory,
  editCategory,
  deleteCategory,
} from '../../redux/categories/actions';

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
  search: '',
};

const Categories = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const {
    isEdit,
    name,
    description,
    drawerOpen,
    itemToRemove,
    itemToEdit,
    search,
  } = state;

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
      dispatch(
        addCategory({ name, description }, () => {
          setState((prevState) => ({
            ...prevState,
            drawerOpen: false,
            name: '',
            description: '',
          }));
        }),
      );
    } else {
      dispatch(
        editCategory(
          itemToEdit._id,
          {
            name,
            description,
          },
          () => {
            setState((prevState) => ({
              ...prevState,
              drawerOpen: false,
              name: '',
              description: '',
            }));
          },
        ),
      );
    }
  };

  const handleCancelModal = () => {
    setState((prevState) => ({ ...prevState, itemToRemove: null }));
  };

  const handleAcceptModal = async () => {
    dispatch(
      deleteCategory(itemToRemove._id, () => {
        setState((prevState) => ({
          ...prevState,
          itemToRemove: null,
        }));
      }),
    );
  };

  const handleSearch = (e) => {
    setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  const filteredData = useMemo(() => {
    const crit = search.toUpperCase();

    return categories.filter((d) => {
      return (
        d.name.toUpperCase().includes(crit) ||
        d.description.toUpperCase().includes(crit)
      );
    });
  }, [search, categories]);

  return (
    <div className={blockName}>
      <h3>
        Categorias ({categories.length}){' '}
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
