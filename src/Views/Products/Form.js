import { Input, Select, ImageSelector } from 'components';

const Form = ({ data, className, onChange, options }) => {
  const {
    name,
    description,
    image,
    category,
    pricePublic,
    priceWholesale,
  } = data;

  return (
    <div className={className}>
      <Input
        value={name}
        name="name"
        placeholder="Nombre del producto"
        label="Nombre *"
        onChange={onChange}
      />
      <ImageSelector
        name="file"
        onChange={onChange}
        image={image}
        label="Imagen *"
      />
      <Select
        name="category"
        label="Categoria *"
        value={category?._id || category}
        options={options}
        onChange={onChange}
      />
      <Input
        value={pricePublic}
        name="pricePublic"
        label="Precio al publico *"
        onChange={onChange}
        type="number"
      />
      <Input
        value={priceWholesale}
        name="priceWholesale"
        label="Precio al mayoreo *"
        onChange={onChange}
        type="number"
      />
      <Input
        value={description}
        name="description"
        label="Descripcion"
        onChange={onChange}
        type="textarea"
      />
    </div>
  );
};

export default Form;
