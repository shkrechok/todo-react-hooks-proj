import { userService } from "../services/user.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER = 'SET_FILTER'
export const SET_USER = 'SET_USER'
export const SET_USER_PREFS = 'SET_USER_PREFS'


const { createStore } = Redux
const user = userService.getLoggedInUser()
const initialState = {
    todos: [],
    loggedInUser: user || {},
    filterBy: {
        txt: '',
        status: 'all',
        owner: user || {}
    },
}

function appReducer(state = initialState, action) {
    console.log('action', action)
    let todos

    switch (action.type) {
        // TODOS
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

        // FILTER
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        // User
        case SET_USER:
            // if i don`t include filter here, then on login the new user sees for a second the previous user`s todos
            return { ...state, loggedInUser: action.user, filterBy: {
                ...state.filterBy,
                owner: action.user
              }}
        case SET_USER_PREFS:
            return { ...state, loggedInUser: {...state.loggedInUser, prefs: {...action.userPrefs}} }
              
        
        default:
            return { ...state }
    }

}

export const store = createStore(appReducer)

store.subscribe(() => {
    console.log('State changed. New state:', store.getState())
})