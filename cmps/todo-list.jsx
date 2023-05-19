import { TodoPreview } from './todo-preview.jsx'

export function TodoList({ todos }) {

    return (
        <section className="todo-list">
            <ul>
                {todos.map(todo => <TodoPreview key={todo._id} todo={todo} />)}
            </ul>
        </section>
    )
}