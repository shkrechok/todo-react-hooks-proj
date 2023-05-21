import { save } from "../lib/babel.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { todoService } from "../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, store } from './store.js'

export const todoActions = {
    loadTodos,
    removeTodo,
    saveTodo,
    ToggleTodoStatus
    
}

function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        }
        )
}

function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        })
}

function ToggleTodoStatus(todoId) {
    return todoService.getById(todoId)
        .then(todo => {
          todo.status = (todo.status === 'done' ? 'active' : 'done')
            saveTodo(todo)
        }).then((updatedTodo) => {
             return updatedTodo
        }
        )
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        }
        )
}
        
function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            // return savedTodo
        }
        )
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        }
        )
}
