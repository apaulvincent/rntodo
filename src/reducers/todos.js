const todos = (state = null, action) => {
  switch (action.type) {

    case 'FETCH_TODOS':
      return action.todos

    case 'ADD_TODO':
      return [
        {
          id: action.id,
          todo: action.todo,
          date: action.date
        },
        ...state
      ]

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)

    case 'UPDATE_TODO':
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