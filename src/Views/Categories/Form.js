import { Input } from 'components';

const blockName = 'form-wrapper';

const Form = ({ data: { name, description }, onChange }) => {
  return (
    <div className={blockName}>
      <Input
        name="name"
        value={name}
        label="Categoria *"
        placeholder="Nombre de la categoria"
        onChange={onChange}
      />
      <Input
        name="description"
        value={description}
        label="Descripcion"
        placeholder="Agrega una descripcion"
        onChange={onChange}
      />
    </div>
  );
};

export default Form;
