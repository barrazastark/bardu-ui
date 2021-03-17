import client from 'services/client';

export const addPurchase = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const purchase = await client.post('/purchases', data);
    dispatch({ type: 'ADD_PURCHASE', payload: purchase.data });
    resolve();
  });
};

export const updatePurchase = (data) => (dispatch) => {
  return new Promise(async (resolve) => {
    const purchase = await client.put(`/purchases/${data.itemData._id}`, data);
    dispatch({ type: 'UPDATE_PURCHASE', payload: purchase.data });
    resolve();
  });
};

export const getPurchases = () => (dispatch) => {
  client.get('/purchases').then((purchases) => {
    dispatch({ type: 'GET_PURCHASES', payload: purchases.data });
  });
};

export const getDetails = (invId) => (dispatch) => {
  return new Promise(async (resolve) => {
    const details = await client.get(`/purchases/details/${invId}`);
    dispatch({
      type: 'GET_DETAILS',
      payload: { invId, details: details.data },
    });
    resolve();
  });
};

export const deletePurchase = (invId) => (dispatch) => {
  return new Promise(async (resolve) => {
    await client.delete(`/purchases/${invId}`);
    dispatch({ type: 'DELETE_PURCHASE', payload: invId });
    resolve();
  });
};
