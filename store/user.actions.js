import { userService } from '../services/user.service.js'
import { store, SET_USER, SET_USER_PREFS, SET_TODOS} from './store/store.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER,  user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER,  user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export function logout() {
    // getting familiar with global window object
    return window.us.logout()
    // return userService.logout()
        .then(user => {
            store.dispatch({ type: SET_USER, user: null })
            store.dispatch({ type: SET_TODOS, todos: [] })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export function updateUserPrefs( updatedUserPrefs, userId){
    return userService.saveUserPrefs(updatedUserPrefs, userId)
        .then(userPrefs => {
            store.dispatch({ type: SET_USER_PREFS, userPrefs })
        })
        .catch(err => {
            console.error('Cannot save user prefs:', err)
            throw err
        })
}

