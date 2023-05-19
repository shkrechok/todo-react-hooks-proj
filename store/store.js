export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'


const { createStore } = Redux

const initialState = {
    todos: []
}

function appReducer(state = initialState, action) {
    console.log('action', action)
    let todos

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            todos = state.todos.filter(c => c._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODO:
            todos = [...state.todos, action.todo]
            console.log('todos', todos)
            return { ...state, todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        default:
            return { ...state }
    }

}

export const store = createStore(appReducer)

store.subscribe(() => {
    console.log('State changed. New state:', store.getState())
})