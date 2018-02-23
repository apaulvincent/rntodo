import { AsyncStorage } from 'react-native'

import { takeEvery, select, call, put } from 'redux-saga/effects'

import {
    FETCH_TODOS,
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
    RETURN_TODOS,

    FETCH_PROJECTS,
    RETURN_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
} from '../actions'


const fetchTodoData = async () => {

    try {

        let todos = await AsyncStorage.getItem('rntodo');
        return todos ? JSON.parse(todos) : [];

    } catch (error) {

        alert(error)
    }
}


// SIDE EFFECTS
function* fetchInitialTodos(action) {

    const result = yield call(fetchTodoData) // YOU CAN PASS ARGUMENTS HERE LIKE :  call( fn , args )

    yield put({ type: RETURN_TODOS, result }); // CALL ANOTHER ACTION
}



function* updateTodo(action) {

    const todos = yield select(state => state.todos);  // 'SELECT' HAS ACCESS TO REDUX STATE, PRETTY NEAT HUH
    AsyncStorage.setItem('rntodo', JSON.stringify(todos));

}



// PROJECTS

const fetchProjectData = async () => {
    try {

        let projects = await AsyncStorage.getItem('rnproject');
        return projects ? JSON.parse(projects) : [];

    } catch (error) {

        alert(error)
    }
}

function* fetchInitialProjects(action) {

    const result = yield call(fetchProjectData)

    // alert(JSON.stringify(result, null, 4))

    yield put({ type: RETURN_PROJECTS, result });
}

function* updateProject(action) {


    const projects = yield select(state => state.projects);


    AsyncStorage.setItem('rnproject', JSON.stringify(projects));

}

// LISTENERS
export default function* rootSaga() {

    // LISTEN AND MAKE SIDE-EFFECTS^
    yield takeEvery(FETCH_TODOS, fetchInitialTodos);
    yield takeEvery(ADD_TODO, updateTodo);
    yield takeEvery(DELETE_TODO, updateTodo);
    yield takeEvery(UPDATE_TODO, updateTodo);


    // LISTEN AND MAKE SIDE-EFFECTS^
    yield takeEvery(FETCH_PROJECTS, fetchInitialProjects);
    yield takeEvery(ADD_PROJECT, updateProject);
    yield takeEvery(UPDATE_PROJECT, updateProject);


}