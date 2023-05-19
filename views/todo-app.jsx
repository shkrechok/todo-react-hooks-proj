const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { TodoList } from '../cmps/todo-list.jsx'
import { SET_TODOS } from '../store/store.js'
import { todoActions } from '../store/todo.actions.js'


export function TodoApp() {
const dispatch = useDispatch()
const todos = useSelector(storeState => storeState.todos)

useEffect(() => {
   todoActions.loadTodos()
}, [])

    

    
return (
    <section className="todo-app">
        <h1>Todo App</h1>
        <TodoList todos={todos} />
        {/* <TodoFilter /> */}
        <Link to="/todo/edit">Add Todo</Link>
    </section>
)
}

