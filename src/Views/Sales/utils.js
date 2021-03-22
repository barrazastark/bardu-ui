export const isValidDetail = ({ price, otherPrice, product, quantity }) => {
  return (
    Boolean(product) &&
    Boolean(quantity) &&
    quantity > 0 &&
    ((Boolean(price) && !Boolean(otherPrice)) ||
      (Boolean(otherPrice) && otherPrice > 0))
  );
};

export const getTotal = (details) => {
  return details.reduce((acc, current) => {
    return acc + current.price * current.quantity;
  }, 0);
};

export const isValidSale = ({ name, createdAt }, saleDetails) => {
  return Boolean(name) && Boolean(createdAt) && saleDetails.length > 0;
};
