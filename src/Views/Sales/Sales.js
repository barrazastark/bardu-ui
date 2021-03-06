import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Table,
  Input,
  DatePicker,
  ProductSelector,
  Icon,
} from 'components';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Sales.scss';
import { numberToCurrency } from 'Views/Products/utils';
import { getToday } from 'Views/Purchases/utils';
import { isValidDetail, getTotal, isValidSale } from './utils';
import { addSale, getDetails, updateSale } from '../../redux/sales/actions';
import { transformDate } from 'utils';
import { getProducts } from 'redux/products/actions';

const blockName = 'sales-wrapper';

const headers = [
  { key: 'name', display: 'Nombre' },
  { key: 'displayedDate', display: 'Fecha' },
];

const emptyData = {
  name: '',
  createdAt: getToday(),
};

const emptyDetail = {
  product: '',
  price: '',
  quantity: 1,
};

const initialState = {
  formVisible: false,
  itemData: emptyData,
  saleDetails: [],
  saleDetail: emptyDetail,
  serial: 1,
  loadingSave: false,
};

const Sales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.sales);
  const details = useSelector((state) => state.purchases.details);

  const products = useSelector((state) => {
    return state.products.products.filter((p) => p.stocks > 0);
  });

  const [state, setState] = useState(initialState);

  const { formVisible, itemData, saleDetail, saleDetails, loadingSave } = state;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (itemData._id) {
      setState((prevState) => ({
        ...prevState,
        saleDetails: details[itemData._id].map((d, index) => {
          return {
            ...d,
            _id: index + 1,
            image: d?.product?.image,
            productName: d?.product?.name,
            product: d?.product?._id,
          };
        }),
        serial: details[itemData._id].length + 1,
      }));
    }
  }, [itemData._id, details]);

  const handleChangeSale = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      itemData: { ...prevState.itemData, [name]: value },
    }));
  };

  const handleClickProduct = (item) => {
    const { value } = item.target;

    if (value) {
      setState((prevState) => ({
        ...prevState,
        saleDetail: {
          ...prevState.saleDetail,
          product: value._id,
          productName: value.name,
          pricePublic: value.pricePublic,
          priceWholesale: value.priceWholesale,
          image: value.image,
        },
      }));
    }
  };

  const handleChangeDetail = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      saleDetail: { ...prevState.saleDetail, [name]: value },
    }));
  };

  const handleAddDetail = () => {
    delete saleDetail.pricePublic;
    delete saleDetail.priceWholesale;
    saleDetail.quantity = Number(saleDetail.quantity);
    saleDetail.price = Number(saleDetail.price);
    if (saleDetail.otherPrice) {
      saleDetail.price = Number(saleDetail.otherPrice);
      delete saleDetail.otherPrice;
    }

    setState((prevState) => ({
      ...prevState,
      saleDetail: emptyDetail,
      serial: prevState.serial + 1,
      saleDetails: [
        ...prevState.saleDetails,
        { ...saleDetail, _id: prevState.serial },
      ],
    }));
  };

  const deleteDetail = (id) => {
    setState((prevState) => ({
      ...prevState,
      saleDetails: prevState.saleDetails.filter((d) => d._id !== id),
    }));
  };

  const handleClickEdit = async (item) => {
    await dispatch(getDetails(item._id));

    setState((prevState) => ({
      ...prevState,
      itemData: item,
      serial: 1,
      formVisible: true,
    }));
  };

  const handleSave = async () => {
    setState((prevState) => ({ ...prevState, loadingSave: true }));
    if (itemData._id) {
      await dispatch(
        updateSale({ sale: state.itemData, details: state.saleDetails }),
      );
      setState((prevState) => ({
        ...prevState,
        loadingSave: false,
      }));
    } else {
      await dispatch(
        addSale({ sale: state.itemData, details: state.saleDetails }),
      );
      setState((prevState) => ({
        ...prevState,
        loadingSave: false,
        formVisible: false,
      }));
    }
  };

  const transformedData = useMemo(() => {
    return sales.map((sale) => {
      return { ...sale, displayedDate: transformDate(sale.createdAt) };
    });
  }, [sales]);

  const validDetail = isValidDetail(saleDetail);
  const validSale = isValidSale(itemData, saleDetails);

  return (
    <div className={blockName}>
      <h3>
        Ventas
        {!formVisible && (
          <Button
            type="primary"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                formVisible: true,
                itemData: emptyData,
                saleDetails: [],
                saleDetail: emptyDetail,
              }))
            }
          >
            Registrar venta
          </Button>
        )}
      </h3>
      {!formVisible && (
        <Table
          headers={headers}
          data={transformedData}
          onEdit={handleClickEdit}
        />
      )}
      {formVisible && (
        <>
          <div className={`${blockName}__form`}>
            <Input
              name="name"
              onChange={handleChangeSale}
              label="Nombre*"
              value={itemData.name}
            />
            <DatePicker
              name="createdAt"
              onChange={handleChangeSale}
              label="Fecha*"
              value={itemData.createdAt}
            />

            <ProductSelector
              value={saleDetail ? saleDetail.product : ''}
              onChange={handleClickProduct}
              products={products}
              name="product"
              label="Producto*"
              className="detail"
            />
            {saleDetail.product && (
              <>
                <label className="price">
                  <span>Precio *</span>
                  <label htmlFor="pricePublic">
                    <input
                      disabled={Boolean(saleDetail.otherPrice)}
                      onChange={handleChangeDetail}
                      type="radio"
                      id="pricePublic"
                      name="price"
                      value={saleDetail.pricePublic}
                    />
                    <span>
                      Publico {numberToCurrency(saleDetail.pricePublic)}
                    </span>
                  </label>
                  <label htmlFor="priceWholesale">
                    <input
                      disabled={Boolean(saleDetail.otherPrice)}
                      onChange={handleChangeDetail}
                      type="radio"
                      id="priceWholesale"
                      name="price"
                      value={saleDetail.priceWholesale}
                    />
                    <span>
                      Mayoreo {numberToCurrency(saleDetail.priceWholesale)}
                    </span>
                  </label>
                  <label>
                    <span>Otro:</span>
                    <input
                      className="otro"
                      type="number"
                      name="otherPrice"
                      onChange={handleChangeDetail}
                    />
                  </label>
                </label>
                <Input
                  onChange={handleChangeDetail}
                  label="Cantidad"
                  name="quantity"
                  value={saleDetail.quantity}
                  className="quantity"
                  type="number"
                />
                <Icon
                  onClick={handleAddDetail}
                  icon={faPlusCircle}
                  className={!validDetail ? 'disabled icon' : 'icon'}
                />
              </>
            )}
          </div>
          {saleDetails.length > 0 && (
            <table className={`${blockName}__list`}>
              <tbody>
                {saleDetails.map((detail) => (
                  <tr key={detail._id} className={`${blockName}__item`}>
                    <td>
                      {detail.image && <img src={detail.image} alt="Imagen" />}
                      <span>
                        {detail.productName || 'Producto no encontrado'}
                      </span>
                    </td>
                    <td>{numberToCurrency(detail.price)}</td>
                    <td>{detail.quantity}</td>
                    <td>{numberToCurrency(detail.price * detail.quantity)}</td>
                    <td>
                      <Icon
                        icon={faTimesCircle}
                        onClick={() => deleteDetail(detail._id)}
                      />
                    </td>
                  </tr>
                ))}
                <tr className={`${blockName}__last-row`}>
                  <td />
                  <td />
                  <td className="bold">Total</td>
                  <td className="bold">
                    {numberToCurrency(getTotal(saleDetails))}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          )}
          <Button
            type="primary"
            disabled={!validSale || loadingSave}
            onClick={handleSave}
          >
            {itemData._id ? 'Actualizar' : 'Guardar'}
          </Button>
          <Button
            disabled={loadingSave}
            className={`${blockName}__cancel-button`}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                formVisible: false,
                itemData: emptyData,
                saleDetails: [],
                saleDetail: emptyDetail,
              }))
            }
          >
            Cancelar
          </Button>
          {loadingSave && <span>Guardando...</span>}
        </>
      )}
    </div>
  );
};

export default Sales;
