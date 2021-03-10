import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToday, isValidForm, getTotal } from './utils';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Form from './Form';
import './Purchases.scss';
import { Button, Icon } from 'components';
import { numberToCurrency } from '../Products/utils';
import { addPurchase } from '../../redux/purchases/actions';

const blockName = 'inventory-wrapper';

const emptyDetail = {
  _id: 1,
  product: {
    name: '',
  },
  cost: '',
  quantity: '',
};

const initialState = {
  itemData: {
    name: '',
    createdAt: getToday(),
  },
  loadingSave: false,
  invDetail: emptyDetail,
  invDetails: [],
  invDetailsSerial: 1,
};

const Inventory = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const { itemData, invDetail, invDetails } = state;

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
    await dispatch(addPurchase({ invDetails, itemData }));
    setState((prevState) => ({ ...prevState, loadingSave: false }));
  };

  const isEnabledButton = isValidForm(itemData) && invDetails.length > 0;

  return (
    <div className={blockName}>
      <h2>Compras</h2>
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
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default Inventory;
