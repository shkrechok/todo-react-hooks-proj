import { utilService } from "../services/util.service.js"

export function TodoPreview({ todo }) {
    const formatedTime = utilService.getformatTimeAgo(todo.createdAt)

    return (
        <section  className="todo-preview">
                <h3>{todo.title}</h3>
                <p>{formatedTime}</p>
        </section>
    )
}