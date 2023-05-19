export function TodoPreview({ todo }) {

    return (
        <li className="todo-preview">
                <h3>{todo.title}</h3>
                <p>{todo.createdAt}</p>
        </li>
    )
}