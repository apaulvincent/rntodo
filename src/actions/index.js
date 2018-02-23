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


export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const RETURN_PROJECTS = 'RETURN_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'


export const fetchProjects = () => {
  return {
    type: FETCH_PROJECTS
  }
}

export const returnProjects = (projects) => {
  return {
    type: RETURN_PROJECTS,
    projects
  }
}

export const addProject = (id, name, todos = [], image) => {
  return {
    type: ADD_PROJECT,
    id,
    name,
    todos,
    image
  }
}

export const updateProject = (id, name, todos = [], image) => {
  return {
    type: UPDATE_PROJECT,
    id,
    name,
    todos,
    image
  }
}
