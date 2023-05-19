import { todoService } from "../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, store } from './store.js'

export const todoActions = {
    loadTodos,
    removeTodo,
    saveTodo,
    
}

function loadTodos() {
    return todoService.query()
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        }
        )
}

function removeTodo() {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        })
}
        
function saveTodo() {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
        }
        )
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        }
        )
}
