import {applyMiddleware, createStore} from "redux";

import reducers from './reducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

export default store;