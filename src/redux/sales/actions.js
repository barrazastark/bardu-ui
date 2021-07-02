import client from 'services/client';

export const addSale = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const sale = await client.post('/sales', data);
    dispatch({ type: 'ADD_SALE', payload: sale.data });
    resolve();
  });
};

export const getSales = () => (dispatch) => {
  client.get('/sales').then((sales) => {
    dispatch({ type: 'GET_SALES', payload: sales.data });
  });
};

export const getDetails = (invId) => (dispatch) => {
  return new Promise(async (resolve) => {
    const details = await client.get(`/sales/details/${invId}`);
    dispatch({
      type: 'GET_DETAILS',
      payload: { invId, details: details.data },
    });
    resolve();
  });
};

export const updateSale = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const sale = await client.put(`/sales/${data.sale._id}`, data);
    dispatch({ type: 'UPDATE_SALE', payload: sale.data });
    resolve();
  });
};
