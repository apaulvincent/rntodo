import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import createSagaMiddleware from "redux-saga";

import rootReducer from '../reducers'
import rootSaga from './sagas'


import todos from '../data/todos'

const defaultState = {
  todos
}


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga);

export default store
