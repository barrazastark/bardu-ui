import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import message from './reducer';
import categories from './categories/reducer';
import products from './products/reducer';
import purchases from './purchases/reducer';

const rootReducer = combineReducers({
  message,
  categories,
  products,
  purchases,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
