import { todoService } from "../services/todo.service.js"
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'

export function TodoAddEdit() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const [todo, setTodo] = useState(todoService.getEmptyTodo())

    function handleTodoChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedTodo = { ...todo, [field]: value }
        setTodo(updatedTodo)
    }

    return <section className={`todo-add-edit ${todo.status}`}>
        <h1>Todo Add Edit</h1>
        <form>
            <label htmlFor="title" >Title</label>
            <input type="text" id="title" name="title" value={todo.title} onChange={handleTodoChange} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={todo.description} onChange={handleTodoChange} />
            <label htmlFor="priority">Priority</label>
            <input type="number" id="priority" name="priority" value={todo.priority} onChange={handleTodoChange} />
            {todo.createdAt && (<p className="createdAt">{todo.createdAt}</p>)}
            <button type="button" onClick={() => dispatch({ type: ADD_TODO, todo })}>Add</button>
        </form>
    </section>
}