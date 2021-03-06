import client from 'services/client';

export const getCategories = () => (dispatch) => {
  client.get('/categories').then((response) => {
    dispatch({
      type: 'SET_CATEGORIES',
      payload: response.data,
    });
  });
};

export const addCategory = (category, callback) => async (dispatch) => {
  const response = await client.post('/categories', category);
  dispatch({
    type: 'ADD_CATEGORY',
    payload: response.data,
  });
  callback();
};

export const editCategory = (id, category, callback) => async (dispatch) => {
  await client.put(`/categories/${id}`, category);
  dispatch({ type: 'EDIT_CATEGORY', payload: { _id: id, ...category } });
  callback();
};

export const deleteCategory = (id, callback) => async (dispatch) => {
  await client.delete(`/categories/${id}`);
  dispatch({
    type: 'DELETE_CATEGORY',
    payload: id,
  });

  callback();
};
