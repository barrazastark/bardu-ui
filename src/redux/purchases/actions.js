import client from 'services/client';

export const addPurchase = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const purchase = await client.post('/purchases', data);
    dispatch({ type: 'ADD_PURCHASE', payload: purchase.data });
    resolve();
  });
};
