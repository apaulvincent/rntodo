// NOTE ACTIONS :

export const FETCH_TODOS = 'FETCH_TODOS'
export const RETURN_TODOS = 'RETURN_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'


export const fetchTodos = () => {
  return {
    type: FETCH_TODOS,
  }
}

export const returnTodos = (todos) => {
  return {
    type: RETURN_TODOS,
    todos
  }
}

export const addTodo = (id, todo, date) => {
  return {
    type: ADD_TODO,
    id,
    todo,
    date
  }
}

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

export const updateTodo = (id, todo, date, end = null) => {
  return {
    type: UPDATE_TODO,
    id,
    todo,
    date,
    end
  }
}


