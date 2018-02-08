const todos = ( state = null, action ) => {
    switch( action.type ) {

        case 'FETCH_TODOS':

		    return action.todos;

        case 'ADD_TODO':

            return [{
                id: action.id,
                todo: action.todo,
                date: action.date
            }, ...state];

        case 'DELETE_TODO':

            return state.filter(todo => todo.id !== action.id);
            
        default:

            return state

    }
}   

export default todos