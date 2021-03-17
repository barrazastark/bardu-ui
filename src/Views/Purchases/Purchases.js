import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToday, isValidForm, getTotal, transformDate } from './utils';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Form from './Form';
import './Purchases.scss';
import { Button, Icon, Table, Modal } from 'components';
import { numberToCurrency } from '../Products/utils';
import {
  addPurchase,
  getDetails,
  updatePurchase,
  deletePurchase,
} from '../../redux/purchases/actions';

const blockName = 'inventory-wrapper';

const emptyDetail = {
  _id: 1,
  product: {
    name: '',
  },
  cost: '',
  quantity: '',
};

const emptyData = {
  name: '',
  createdAt: getToday(),
};

const initialState = {
  itemData: emptyData,
  loadingSave: false,
  invDetail: emptyDetail,
  invDetails: [],
  invDetailsSerial: 1,
  formVisible: false,
  itemToDelete: null,
};

const headers = [
  {
    key: 'name',
    display: 'Nombre de la compra',
  },
  {
    key: 'displayedDate',
    display: 'Fecha',
  },
];

const Inventory = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const purchases = useSelector((state) => state.purchases.purchases);
  const details = useSelector((state) => state.purchases.details);

  const {
    itemData,
    invDetail,
    invDetails,
    formVisible,
    loadingSave,
    itemToDelete,
  } = state;

  useEffect(() => {
    if (itemData._id) {
      setState((prevState) => ({
        ...prevState,
        invDetails: details[itemData._id],
      }));
    }
  }, [itemData._id, details]);

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      itemData: {
        ...prevState.itemData,
        [name]: value,
      },
    }));
  };

  const handleChangeDetail = (e) => {
    setState((prevState) => ({
      ...prevState,
      invDetail: {
        ...prevState.invDetail,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleClickNewEntry = () => {
    setState((prevState) => ({
      ...prevState,
      invDetailsSerial: prevState.invDetailsSerial + 1,
      invDetail: emptyDetail,
      invDetails: [
        ...prevState.invDetails,
        { ...prevState.invDetail, _id: prevState.invDetailsSerial },
      ],
    }));
  };

  const handleClickDeleteEntry = (id) => {
    setState((prevState) => ({
      ...prevState,
      invDetails: prevState.invDetails.filter((d) => d._id !== id),
    }));
  };

  const handleClickSave = async () => {
    setState((prevState) => ({ ...prevState, loadingSave: true }));
    if (itemData._id) {
      await dispatch(updatePurchase({ invDetails, itemData }));
      setState((prevState) => ({
        ...prevState,
        loadingSave: false,
      }));
    } else {
      await dispatch(addPurchase({ invDetails, itemData }));
      setState((prevState) => ({
        ...prevState,
        loadingSave: false,
        formVisible: false,
      }));
    }
  };

  const handleClickEdit = async (item) => {
    await dispatch(getDetails(item._id));

    setState((prevState) => ({
      ...prevState,
      itemData: item,
      invDetailsSerial: 1,
      formVisible: true,
    }));
  };

  const handleClickRemove = (itemToDelete) => {
    setState((prevState) => ({ ...prevState, itemToDelete }));
  };

  const hideModal = () =>
    setState((prevState) => ({ ...prevState, itemToDelete: null }));

  const handleDeletePurchase = async () => {
    setState((prevState) => ({ ...prevState, itemToDelete: null }));
    await dispatch(deletePurchase(itemToDelete._id));
  };

  const isEnabledButton = useMemo(() => {
    return isValidForm(itemData) && invDetails.length > 0 && !loadingSave;
  }, [itemData, invDetails, loadingSave]);

  const transformedData = useMemo(() => {
    return purchases.map((purchase) => {
      return { ...purchase, displayedDate: transformDate(purchase.createdAt) };
    });
  }, [purchases]);

  return (
    <div className={blockName}>
      <h3>
        Compras
        {!formVisible && (
          <Button
            type="primary"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                formVisible: true,
                itemData: emptyData,
                invDetails: [],
                invDetail: emptyDetail,
              }))
            }
          >
            Registrar compra
          </Button>
        )}
      </h3>
      {!formVisible && (
        <Table
          headers={headers}
          data={transformedData}
          onEdit={handleClickEdit}
          onRemove={handleClickRemove}
        />
      )}

      {formVisible && (
        <div className={`${blockName}__inventory`}>
          <Form
            onChange={handleChange}
            onChangeDetail={handleChangeDetail}
            data={itemData}
            detailData={invDetail}
            onClickNewEntry={handleClickNewEntry}
          />
          {invDetails.length > 0 && (
            <table className={`${blockName}__product-list`}>
              <tbody>
                {invDetails.map((detail) => (
                  <tr key={detail._id} className={`${blockName}__product-item`}>
                    <td>{detail.product.name}</td>
                    <td>{numberToCurrency(detail.cost)}</td>
                    <td>{detail.quantity}</td>
                    <td>{numberToCurrency(detail.cost * detail.quantity)}</td>
                    <td>
                      <Icon
                        icon={faTimesCircle}
                        onClick={() => handleClickDeleteEntry(detail._id)}
                      />
                    </td>
                  </tr>
                ))}
                <tr className={`${blockName}__last-row`}>
                  <td />
                  <td />
                  <td className="bold">Total</td>
                  <td className="bold">
                    {numberToCurrency(getTotal(invDetails))}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          )}

          <Button
            type="primary"
            className={`${blockName}__save-button`}
            disabled={!isEnabledButton}
            onClick={handleClickSave}
          >
            {itemData._id ? 'Actualizar' : 'Guardar'}
          </Button>
          <Button
            className={`${blockName}__cancel-button`}
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                formVisible: false,
                itemData: emptyData,
                invDetails: [],
                invDetail: emptyDetail,
              }))
            }
            disabled={loadingSave}
          >
            Cancelar
          </Button>
          {loadingSave && <span>Guardando...</span>}
        </div>
      )}
      <Modal
        isVisible={Boolean(itemToDelete)}
        onCancel={hideModal}
        onAccept={handleDeletePurchase}
      >
        <p>Estas seguro de borrar la compra ?</p>
        <p>
          Recuerda que es algo que no puede deshacerse y esto afectará al
          inventario y las ganancias.
        </p>
      </Modal>
    </div>
  );
};

export default Inventory;
