const { Link } = ReactRouterDOM

import { TodoPreview } from './todo-preview.jsx'

export function TodoList({ todos }) {

    return (
        <section className="todo-list">
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <TodoPreview todo={todo} />
                        <button><Link to={`/todo/edit/${todo._id}`} >Edit</Link></button>
                        </li>
                ))}
            </ul>
        </section>
    )
}