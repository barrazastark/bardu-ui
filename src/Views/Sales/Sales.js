import { useState } from 'react';
import { useSelector } from 'react-redux';
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
  const products = useSelector((state) =>
    state.products.products.filter((p) => p.stocks > 0),
  );
  const [state, setState] = useState(initialState);

  const { formVisible, itemData, saleDetail, saleDetails, loadingSave } = state;

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
    setState((prevState) => ({
      ...prevState,
      saleDetail: {
        ...prevState.saleDetail,
        product: value ? value._id : '',
        productName: value ? value.name : '',
        pricePublic: value ? value.pricePublic : '',
        priceWholesale: value ? value.priceWholesale : '',
        image: value ? value.image : '',
      },
    }));
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
      saleDetails: [
        ...prevState.saleDetails,
        { _id: prevState.serial, ...saleDetail },
      ],
      serial: prevState.serial + 1,
    }));
  };

  const deleteDetail = (id) => {
    setState((prevState) => ({
      ...prevState,
      saleDetails: prevState.saleDetails.filter((d) => d._id !== id),
    }));
  };

  const handleSave = async () => {
    setState((prevState) => ({ ...prevState, loadingSave: true }));
  };

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
      {!formVisible && <Table headers={headers} data={[]} />}
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
              value={saleDetail.product}
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
                      <img src={detail.image} alt="Img" />
                      <span>{detail.productName}</span>
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
