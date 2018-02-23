import { combineReducers } from 'redux';

import projects from './projects';
import todos from './todos';

const rootReducer = combineReducers({ todos, projects });

export default rootReducer;
