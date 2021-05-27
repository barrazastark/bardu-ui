export const getToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toJSON().slice(0, 10);
};

export const isValidForm = (inventory) => {
  const { name, createdAt } = inventory;
  const invFilled = Boolean(name && createdAt);

  if (!invFilled) {
    return false;
  }

  return true;
};

export const validDetail = (detail) => {
  const { cost, product, quantity } = detail;
  const validCost = !isNaN(cost) && cost !== '';
  const validQuantity = !isNaN(quantity) && quantity !== '' && quantity > 0;
  if (!validQuantity || !validCost || !product) {
    return false;
  }
  return true;
};

export const getTotal = (details) => {
  return details.reduce((acc, current) => {
    return acc + current.cost * current.quantity;
  }, 0);
};

export const transformDate = (createdAt) => {
  const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };

  const days = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
  };

  const date = new Date(createdAt);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${dayOfWeek} - ${day} ${month} - ${year}`;
};
