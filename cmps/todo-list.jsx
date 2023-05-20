const { Link } = ReactRouterDOM

import { TodoPreview } from './todo-preview.jsx'

export function TodoList({ todos, onDeleteTodo,  onToggleTodoStatus }) {

    function onToggle(todoId) {
        onToggleTodoStatus(todoId)
    }

    return (
        <section className="todo-list">
            <ul className='clean-list'>
                {todos.map(todo => (
                    <li key={todo._id} className={todo.status === 'active' ? 'active' : 'done'}>

                        <TodoPreview todo={todo} />

                        <section className="todo-actions">

                            <button><Link to={`/todo/edit/${todo._id}?viewType=edit`} >Edit</Link></button>
                            <button><Link to={`/todo/edit/${todo._id}?viewType=details`} >Details</Link></button>
                            <button onClick={() => { onDeleteTodo(todo._id) }}>x</button>

                            <label className={todo.status === 'active' ? 'active' : 'done'} htmlFor={`done${todo._id}`}>
                                {todo.status === 'done' ? 'Activate' : 'Mark as done'}
                            </label>
                            <input className={todo.status === 'active' ? 'active' : 'done'} 
                                type='checkbox' id={`done${todo._id}`} onClick={() => { onToggle(todo._id) }} />

                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}