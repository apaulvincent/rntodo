import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  RETURN_TODOS
} from '../actions'


const todos = (state = [], action) => {
  switch (action.type) {

    case RETURN_TODOS:
      return action.result

    case ADD_TODO:
      return [
        {
          id: action.id,
          todo: action.todo,
          date: action.date
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)

    case UPDATE_TODO:
      const newTodo = state.filter(todo => todo.id !== action.id)

      return [
        {
          id: action.id,
          todo: action.todo,
          date: action.date,
          end: action.end
        },
        ...newTodo
      ]

    default:
      return state
  }
}

export default todos