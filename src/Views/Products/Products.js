import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faPlusCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Drawer, Icon } from 'components';
import Form from './Form';
import {
  addProduct,
  editProduct,
  deleteProduct,
} from '../../redux/products/actions';
import { numberToCurrency } from './utils';
import './Products.scss';

const blockName = 'products-wrapper';
const initialState = {
  search: '',
  drawerOpen: false,
  isEdit: false,
  itemToDelete: null,
  isLoadingDrawer: false,
  messageLoader: '',
  itemData: {
    name: '',
    description: '',
    quantity: '',
    category: null,
    image: '',
    file: null,
    pricePublic: '',
    priceWholesale: '',
  },
  filters: [],
};
const Products = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);

  const {
    search,
    isEdit,
    drawerOpen,
    itemData,
    itemToDelete,
    isLoadingDrawer,
    messageLoader,
    filters,
  } = state;

  const handleSearch = (e) => {
    setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  const handleCandelDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: false,
      itemData: initialState.itemData,
    }));
  };

  const handleAcceptDrawer = async () => {
    setState((prevState) => ({
      ...prevState,
      isLoadingDrawer: true,
      messageLoader: 'Guardando',
    }));
    const {
      file,
      name,
      description,
      category,
      pricePublic,
      priceWholesale,
    } = itemData;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('pricePublic', pricePublic);
    formData.append('priceWholesale', priceWholesale);

    if (isEdit) {
      file && formData.append('image', file);

      formData.append('category', category._id || category);
      await dispatch(editProduct(itemData._id, formData, itemData));
      setState((prevState) => ({
        ...prevState,
        drawerOpen: false,
        itemData: initialState.itemData,
        isLoadingDrawer: false,
      }));
      return;
    }

    formData.append('image', file);
    formData.append('category', category);

    await dispatch(addProduct(formData));
    setState((prevState) => ({
      ...prevState,
      drawerOpen: false,
      itemData: initialState.itemData,
      isLoadingDrawer: false,
    }));
  };

  const handleFormChange = (e) => {
    const name = e.target.name;

    if (name === 'file') {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setState((prevState) => ({
          ...prevState,
          itemData: {
            ...prevState.itemData,
            file: file,
            image: reader.result,
          },
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        itemData: {
          ...prevState.itemData,
          [name]: e.target.value,
        },
      }));
    }
  };

  const handleClickItem = (item) => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: true,
      itemData: item,
      isEdit: true,
    }));
  };

  const handleClickDelete = async () => {
    if (itemToDelete) {
      setState((prevState) => ({
        ...prevState,
        isLoadingDrawer: true,
        messageLoader: 'Eliminando',
      }));

      await dispatch(deleteProduct(itemToDelete._id));
      setState((prevState) => ({
        ...prevState,
        itemToDelete: null,
        isLoadingDrawer: false,
        drawerOpen: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        itemToDelete: itemData,
        isLoadingDrawer: false,
      }));
    }
  };

  const handleCancelDelete = () => {
    setState((prevState) => ({ ...prevState, itemToDelete: null }));
  };

  const handleClickFilter = (filterId) => {
    const indexOf = filters.indexOf(filterId);

    setState((prevState) => ({
      ...prevState,
      filters:
        indexOf === -1
          ? [...filters, filterId]
          : prevState.filters.filter((f) => f !== filterId),
    }));
  };

  const filteredData = useMemo(() => {
    const crit = search.toUpperCase();

    return products
      .filter((d) => {
        return (
          d.name.toUpperCase()?.includes(crit) ||
          d?.category?.name?.toUpperCase()?.includes(crit) ||
          d?.description?.toUpperCase()?.includes(crit)
        );
      })
      .filter((p) => {
        return (
          filters.length === 0 ||
          filters.indexOf(p?.category?._id) !== -1 ||
          filters.indexOf(p?.category) !== -1
        );
      });
  }, [search, products, filters]);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      id: category._id,
      display: category.name,
    }));
  }, [categories]);

  const drawerDidabled =
    !itemData.name ||
    (!itemData.file && !itemData.image) ||
    !itemData.category ||
    !itemData.pricePublic ||
    !itemData.priceWholesale;

  const orderedCategories = useMemo(
    () => categories.sort((a, b) => (a.name > b.name ? 1 : -1)),
    [categories],
  );

  return (
    <div className={blockName}>
      <h3>
        Productos {`(${filteredData.length})`}
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
          Agregar producto
        </Button>
      </h3>
      <div className={`${blockName}__products-content`}>
        <div className={`${blockName}__filters`}>
          <h3>
            Filtros <Icon icon={faFilter} />
          </h3>
          {orderedCategories.map((filter) => (
            <label key={filter._id} htmlFor={filter._id}>
              <span>{filter.name}</span>
              <input
                id={filter._id}
                type="checkbox"
                onChange={() => handleClickFilter(filter._id)}
              />
            </label>
          ))}
        </div>
        <div className={`${blockName}__products-list`}>
          {filteredData.map((item) => (
            <div
              key={item._id}
              className={`${blockName}__item`}
              onClick={() => handleClickItem(item)}
            >
              <img src={item.image} alt="Imagen" />
              <div className={`${blockName}__item-bottom`}>
                <p>{item.name}</p>
                <p className={`${blockName}__prices`}>
                  <span>Publico: {numberToCurrency(item.pricePublic)}</span>
                  <span>Mayoreo: {numberToCurrency(item.priceWholesale)}</span>
                </p>
                <p>
                  Disponibles: <span>{item.quantity || 0}</span>
                </p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Drawer
        isVisible={drawerOpen}
        title={`${isEdit ? 'Editar' : 'Agregar'} producto`}
        onCancel={handleCandelDrawer}
        onAccept={handleAcceptDrawer}
        isLoading={isLoadingDrawer}
        messageLoader={messageLoader}
        isButtonDisabled={drawerDidabled}
      >
        <Form
          data={itemData}
          onChange={handleFormChange}
          options={categoryOptions}
        />
        {isEdit && (
          <Button
            className={`${blockName}__delete-button`}
            type="danger"
            onClick={handleClickDelete}
          >
            {itemToDelete ? 'Confirmar' : 'Borrar'}
          </Button>
        )}
        {isEdit && itemToDelete && (
          <Button onClick={handleCancelDelete}>Cancelar</Button>
        )}
      </Drawer>
    </div>
  );
};
export default Products;
