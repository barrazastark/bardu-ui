import { useState, useMemo, useEffect, useRef } from 'react';
import { Icon } from 'components';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './ProductSelector.scss';

const blockName = 'product-selector';

const ProductSelector = ({ products, onChange, value, name, label }) => {
  const input = useRef(null);
  const [search, setSearch] = useState('');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (value) {
      const p = products.find((p) => p._id === value);
      setSearch(p.name);
    } else {
      setSearch('');
    }
  }, [value, products]);

  const handleChange = (e) => {
    onChange({ target: { name, value: null } });
    setSearch(e.target.value);
  };

  const show = () => setHide(true);

  const noShow = () => setHide(false);

  const clear = () => {
    setSearch('');
    onChange({ target: { name, value: null } });
    input.current.focus();
    show();
  };

  const handleClick = (item) => {
    onChange({ target: { name, value: item } });
    setSearch(item.name);
    noShow();
  };

  const filteredProducts = useMemo(() => {
    const crit = search.toUpperCase();
    return products.filter((d) => {
      return (
        d.name.toUpperCase().includes(crit) ||
        d?.category?.name?.toUpperCase()?.includes(crit) ||
        d?.description?.toUpperCase()?.includes(crit)
      );
    });
  }, [search, products]);

  return (
    <div className={blockName}>
      <label>{label}</label>
      <input
        ref={input}
        type="text"
        name={name}
        onChange={handleChange}
        value={search}
        onClick={show}
      />
      {search && <Icon icon={faTimesCircle} onClick={clear} />}
      {hide && Boolean(filteredProducts.length) && (
        <>
          <div className={`${blockName}__outside-list`} onClick={noShow} />
          <div className={`${blockName}__list`}>
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className={`${blockName}__item`}
                onClick={() => handleClick(p)}
              >
                <img src={p.image} alt="Imagen" />
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSelector;
