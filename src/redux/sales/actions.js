import client from 'services/client';

export const addSale = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const sale = await client.post('/sales', data);
    dispatch({ type: 'ADD_SALE', payload: sale.data });
    resolve();
  });
};
