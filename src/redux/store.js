import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import message from './reducer';
import categories from './categories/reducer';
import products from './products/reducer';
import purchases from './purchases/reducer';

const rootReducer = combineReducers({
  purchases,
  message,
  categories,
  products,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
