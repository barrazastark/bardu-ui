import { useSelector } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Icon, ProductSelector } from 'components';
import { validDetail } from './utils';

const blockName = 'form';

const Form = ({
  data,
  onChange,
  detailData,
  onClickNewEntry,
  onChangeDetail,
}) => {
  const products = useSelector((state) => state.products.products);

  const { createdAt, name } = data;
  const { product, cost, quantity } = detailData;

  const enabledButton = validDetail(detailData);

  return (
    <div className={blockName}>
      <Input onChange={onChange} name="name" value={name} label="Nombre *" />
      <DatePicker
        name="createdAt"
        value={createdAt}
        onChange={onChange}
        label="Fecha *"
      />

      <div className="divider">
        <ProductSelector
          products={products}
          label="Producto *"
          name="product"
          onChange={onChangeDetail}
          value={product ? product._id : ''}
        />
        <Input
          name="cost"
          label="Cosoto (unitario) *"
          type="number"
          onChange={onChangeDetail}
          value={cost}
        />
        <Input
          name="quantity"
          label="Cantidad *"
          type="number"
          onChange={onChangeDetail}
          value={quantity}
        />
        <div className={`add-item ${!enabledButton ? 'disabled-button' : ''}`}>
          <Icon icon={faPlusCircle} onClick={onClickNewEntry} />
        </div>
      </div>
    </div>
  );
};

export default Form;
