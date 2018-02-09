// NOTE ACTIONS :

export const fetchTodos = todos => {
  return {
    type: 'FETCH_TODOS',
    todos
  }
}

export const addTodo = (id, todo, date) => {
  return {
    type: 'ADD_TODO',
    id,
    todo,
    date
  }
}

export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    id
  }
}
