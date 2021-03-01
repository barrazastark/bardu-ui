import './Form.scss';
import { Input } from 'components';

const blockName = 'form-wrapper';

const Form = ({ data: categoryName, onChange }) => {
  return (
    <div className={blockName}>
      <Input
        name="name"
        value={categoryName}
        label="Categoria"
        placeholder="Nombre de la categoria"
        onChange={onChange}
      />
    </div>
  );
};

export default Form;
