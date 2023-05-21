const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { useParams, useNavigate, useLocation } = ReactRouterDOM

import { todoService } from "../services/todo.service.js"
import { todoActions } from '../store/todo.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function TodoAddEdit() {
    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const viewType = queryParams.get('viewType') || 'add'
    console.log('viewType', viewType)

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])


    function loadTodo() {
        todoService.getById(params.todoId)
            .then(setTodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err)
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
            // return savedTodo
        })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('Cannot save todo', err)
            })

    }

    function onEdit(ev) {
        ev.preventDefault()
        navigate(`/todo/edit/${todoToEdit._id}?viewType=edit`)
    }

    const formatedTimeCreated = utilService.getformatTimeAgo(todoToEdit.createdAt)
    
    const formatedTimeUpdated = utilService.getformatTimeAgo(todoToEdit.updatedAt)
    
    if (params.todoId && !todoToEdit._id) return <div>Loading...</div>
 
    if (viewType === 'details') return (
        
        <section className={`todo-details ${todoToEdit.status}`}>
        <h1>Details</h1>
        <form onSubmit={(ev) => {onEdit(ev)}}>
          <label htmlFor="title">Title</label>
          <p>{todoToEdit.title}</p>
  
          <label htmlFor="description">Description</label>
          <p>{todoToEdit.description} </p>
  
          <label htmlFor="priority">Priority</label>
          <p>{todoToEdit.priority}</p>

          <label htmlFor="status">Status</label>
            <p>{todoToEdit.status}</p>
  
          {todoToEdit.createdAt && <p className="createdAt">Created {formatedTimeCreated}</p>}
          {todoToEdit.updatedAt && <p className="updatedAt">Updated {formatedTimeUpdated}</p>}
  
          <button type="edit-btn" >Edit</button>
        </form>
      </section> )
    
    
    return <section className={`todo-add-edit ${todoToEdit.status}`}>
        <h1>Editor</h1>
        <form onSubmit={onSaveTodo}>
            <label htmlFor="title" >Title</label>
            <input type="text" id="title" name="title" value={todoToEdit.title} onChange={handleTodoChange} />
            <label htmlFor="description">Description</label>
            <textarea type="text" id="description" name="description" value={todoToEdit.description} onChange={handleTodoChange} ></textarea>
            <label htmlFor="priority">Priority</label>
            <input type="number" id="priority" name="priority" value={todoToEdit.priority} onChange={handleTodoChange} />
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={todoToEdit.status} onChange={handleTodoChange}>
                <option value="done">Done</option>
                <option value="active">Active</option>
            </select>
            {todoToEdit.createdAt && (<p className="createdAt">Created {formatedTimeCreated}</p>)}
            {todoToEdit.updatedAt && (<p className="updatedAt">Last update {formatedTimeUpdated}</p>)}
            <button type="add-edit-btn" >{todoToEdit._id ? 'Save' : 'Add'}</button>
        </form>
    </section>
}