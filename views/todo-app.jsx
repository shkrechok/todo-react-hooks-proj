const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { TodoList } from '../cmps/todo-list.jsx'
import { SET_TODOS, SET_FILTER, store } from '../store/store.js'
import { todoActions } from '../store/todo.actions.js'
import { TodoFilter } from '../cmps/todo-filter.jsx'
import { LoginSignup } from '../cmps/login-signup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const curFilterBy = useSelector(storeState => storeState.filterBy)
    const filterDispatcher = (filterBy) => dispatch({ type: SET_FILTER, filterBy })
    const user = useSelector((storeState) => storeState.loggedInUser)

    useEffect(() => {
        console.log(curFilterBy)
        todoActions.loadTodos(curFilterBy)
    }, [curFilterBy, user])


    function onDeleteTodo(todoId){
        todoActions.removeTodo(todoId).then(() => {
            showSuccessMsg('Todo deleted')
            return todoId
        }
        )
            .catch(err => {
                showErrorMsg('Cannot delete todo')
                console.log('Cannot delete todo', err)
            }
            )
    }

    function onToggleTodoStatus(todoId) {
        todoActions.ToggleTodoStatus(todoId).then(() => {
            showSuccessMsg('Todo updated')
            return todoId
        }
        )
            .catch(err => {
                showErrorMsg('Cannot update todo')
                console.log('Cannot update todo', err)
            }
            )
    }

    if (!user) {
        return (
            <section className="main-page">
                <section className="user-info">
                    <LoginSignup dispatch={dispatch} />
                </section>
            </section>
        )
    }

    if (!todos) {
        return (
            <section className="main-page">
                <section className="user-info">
                    <div>Loading...</div>
                </section>
            </section>
        )
    }

    if (!todos.length) {
        return (
            <section className="main-page">
                <section className="todo-app flex column">
                    <header className="todo-header flex align-center space-between">
                        <h1>Todo App</h1>
                        <Link to="/todo/edit">Add Todo</Link>
                    </header>
                    <div>No todos to show</div>
                    <TodoFilter dispatcher={filterDispatcher} curFilterBy={curFilterBy} />
                </section>
            </section>
        )
    }

    return (
        <section className="main-page">
            <section className="todo-app flex column">
                <header className="todo-header flex align-center space-between">
                <h1>Todo App</h1>
                <Link to="/todo/edit">Add Todo</Link>
                </header>
                <TodoList todos={todos} onDeleteTodo={onDeleteTodo} onToggleTodoStatus={onToggleTodoStatus} />
                <TodoFilter dispatcher={filterDispatcher} curFilterBy={curFilterBy} />
                
            </section>
        </section>
    )
}


