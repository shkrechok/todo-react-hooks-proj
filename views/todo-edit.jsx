import { todoService } from "../services/todo.service.js"
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'
import { todoActions } from '../store/todo.actions.js'
const {useParams, useNavigate } = ReactRouterDOM
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function TodoAddEdit() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.getById(params.todoId)
            .then(setTodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err);
                navigate('/todo')
                showErrorMsg('todo not found!')
            })
    }

    function handleTodoChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedTodo = { ...todoToEdit, [field]: value }
        setTodoToEdit(updatedTodo)
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        todoActions.saveTodo(todoToEdit).then((savedTodo) => {
            showSuccessMsg('Todo saved')
            navigate('/todo')
            return savedTodo
        })
        .catch (err => {
            showErrorMsg('Cannot save todo')
            console.log('Cannot save todo', err)
        })

    }

    const formatedTime = utilService.getformatTimeAgo(todoToEdit.createdAt)

    if ( params.todoId && !todoToEdit._id) return <div>Loading...</div>
    return <section className={`todo-add-edit ${todoToEdit.status}`}>
        <h1>Todo Add Edit</h1>
        <form onSubmit={onSaveTodo}>
            <label htmlFor="title" >Title</label>
            <input type="text" id="title" name="title" value={todoToEdit.title} onChange={handleTodoChange} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={todoToEdit.description} onChange={handleTodoChange} />
            <label htmlFor="priority">Priority</label>
            <input type="number" id="priority" name="priority" value={todoToEdit.priority} onChange={handleTodoChange} />
            { todoToEdit.createdAt && (<p className="createdAt">Created {formatedTime}</p>)}
            <button type="add-edit-btn" >{todoToEdit._id ? 'Save' : 'Add'}</button>
        </form>
    </section>
}