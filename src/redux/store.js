import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, } from 'redux';

import reducer from './reducers/reducers';

const initialState = {
	items : [],
	currentPage:1,
}

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware()));

export { store }