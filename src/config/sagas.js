import { AsyncStorage } from 'react-native'

import { takeEvery, select, call, put } from 'redux-saga/effects'

import {
    FETCH_TODOS,
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    RETURN_TODOS
} from '../actions'


const fetchData = async () => {

    try {

        let todos = await AsyncStorage.getItem('rntodo');
        return JSON.parse(todos);

    } catch (error) {

        alert(error)
    }
}


// SIDE EFFECTS
function* fetchInitialTodos(action) {

    const result = yield call(fetchData) // YOU CAN PASS ARGUMENTS HERE

    yield put({ type: RETURN_TODOS, result }); // CALL ANOTHER ACTION
}

function* updateTodo(action) {

    const todos = yield select(state => state.todos);
    AsyncStorage.setItem('rntodo', JSON.stringify(todos));

}


// LISTENERS
export default function* rootSaga() {

    // LISTEN AND MAKE SIDE-EFFECTS^
    yield takeEvery(FETCH_TODOS, fetchInitialTodos);
    yield takeEvery(ADD_TODO, updateTodo);
    yield takeEvery(DELETE_TODO, updateTodo);
    yield takeEvery(UPDATE_TODO, updateTodo);
}