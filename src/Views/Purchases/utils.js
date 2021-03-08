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
  const validCost = !isNaN(cost) && cost !== '' && cost >= 0;
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
