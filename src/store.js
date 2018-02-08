import { createStore } from 'redux';

import rootReducer from './reducers';

import todos from './data/todos';

const defaultState = {
    todos
};

const store = createStore(rootReducer, defaultState);
export default store;