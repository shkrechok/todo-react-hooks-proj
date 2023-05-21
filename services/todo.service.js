import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

const demoTodos = [
    {
        "_id": "t101",
        "title": "Learn React",
        "description": "Do that and that, and then do that and that too.",
        "status": "active",
        "createdAt": 1528817077286,
        "owner": {
            "_id": "u101",
            "username": "user1",
            "fullname": "First User",
        },
        "priority": 1,
        "updatedAt": 1528817084351,
    },
    {
        "_id": "t102",
        "title": "Master CSS",
        "description": "Do that and that in pixec perfect and responsive",
        "status": "active",
        "createdAt": 1528817084351,
        "owner": {
            "_id": "u102",
            "username": "user2",
            "fullname": "Second User",
        },
        "priority": 1,
        "updatedAt": 1528817084351,
    } ,
    {
        "_id": "t103",
        "title": "Do groceries",
        "description": "Milk, Cheese, Pizza, Popcorn, Chocolate, Chips, Pasta, Ice cream, Potatoes, Tomato, Onion",
        "description": "",
        "status": "active",
        "createdAt": 1528817084351,
        "owner": {
            "_id": "u102",
            "username": "user3",
            "fullname": "Third User",
        },
        "priority": 1,
        "updatedAt": 1528817084351,
    }
]
   
_createTodos()
export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}


function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY).then(todos => {
        // if (!filterBy) return todos
        if (filterBy.owner){
        todos = todos.filter(todo => todo.owner._id === filterBy.owner._id)
        }
        if (filterBy.status !== 'all') {
            todos = todos.filter(todo => todo.status === filterBy.status)
        }
        
        if (filterBy.txt) {
            return todos.filter(todo => todo.title.includes(filterBy.txt))
        }
        
        
        return todos
    }
    ).catch(err => {
        console.log('Had issues in todo service:', err)
        throw err
    }
    )
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
    console.log('todo.service', todo)
    if (todo._id) {
        todo.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        todo.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    let user = userService.getLoggedInUser()
    user.username = userService.getById(user._id).username
    return { 
        title: '',
        description: '',
        status: 'active',
        createdAt: undefined,
        owner: {...user},
        priority: 1,
        updatedAt: undefined,
    }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = demoTodos
        utilService.saveToStorage(STORAGE_KEY, todos)
    }
    console.log('todos', todos)
    // return todos
}
