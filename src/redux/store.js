import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import messageReducer from './reducer';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';

const rootReducer = combineReducers({
  message: messageReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
