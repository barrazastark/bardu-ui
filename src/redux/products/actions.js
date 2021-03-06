import client from 'services/client';

export const getProducts = () => (dispatch) => {
  client.get('/products').then((response) => {
    dispatch({
      type: 'GET_PRODUCTS',
      payload: response.data,
    });
  });
};

export const addProduct = (product) => (dispatch) => {
  return new Promise(async (resolve) => {
    const response = await client.post('/products', product);
    dispatch({
      type: 'ADD_PRODUCT',
      payload: response.data,
    });
    resolve();
  });
};

export const editProduct = (id, productForm, product) => async (dispatch) => {
  return new Promise(async (resolve) => {
    await client.put(`/products/${id}`, productForm);
    dispatch({ type: 'EDIT_PRODUCT', payload: { _id: id, ...product } });
    resolve();
  });
};

export const deleteProduct = (id) => (dispatch) => {
  return new Promise(async (resolve) => {
    await client.delete(`/products/${id}`);
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: id,
    });
    resolve();
  });
};
