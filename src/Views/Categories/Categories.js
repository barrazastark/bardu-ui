import { useState } from 'react';
import { Table, Button } from 'components';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Categories.scss';
import { Drawer } from 'components';
import data from './data';

const blockName = 'categories-wrapper';

const headers = [
  {
    key: 'name',
    display: 'Nombre',
  },
];

const Categories = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCancel = () => {
    setDrawerOpen(false);
  };

  const handleAccept = () => {};

  return (
    <div className={blockName}>
      <h3>
        Categorias ({data.length}){' '}
        <Button
          onClick={() => setDrawerOpen(true)}
          icon={faPlusCircle}
          type="primary"
        >
          Agregar categoria
        </Button>
      </h3>
      <Table data={data} headers={headers} />
      <Drawer
        isVisible={drawerOpen}
        title="Agregar categoria"
        onCancel={handleCancel}
        onAccept={handleAccept}
      >
        <p>Body</p>
      </Drawer>
    </div>
  );
};

export default Categories;
