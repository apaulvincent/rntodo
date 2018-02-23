import {
    FETCH_PROJECTS,
    RETURN_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
} from '../actions'


const projects = (state = [], action) => {
    switch (action.type) {

        case RETURN_PROJECTS:
            return action.result

        case ADD_PROJECT:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    todos: action.todos,
                    image: action.image,
                }
            ]

        case UPDATE_PROJECT:
            const newProject = state.filter(p => p.id != action.id)

            return [
                ...newProject,
                {
                    id: action.id,
                    name: action.name,
                    todos: action.todos,
                    image: action.image,
                }
            ]


        default:
            return state
    }
}

export default projects