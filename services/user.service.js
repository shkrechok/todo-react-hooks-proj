import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

const demoUsers = [
    {
        "_id": "u101",
        "username": "user1",
        "password": "secret1",
        "fullname": "First User",
        "balance": 10000,
        "activities": []
    },
    {
        "_id": "u102",
        "username": "user2",
        "password": "secret2",
        "fullname": "Second User",
        "balance": 10000,
        "activities": []
    },
    {
        "_id": "u103",
        "username": "user3",
        "password": "secret3",
        "fullname": "Third User",
        "balance": 10000,
        "activities": []
    }
]

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedInUser,
    getEmptyCredentials
}

window.us = userService

_createUsers()

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}


function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedInUser() {
    let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
  console.log('userService', user)
    return user
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

function _createUsers() {
    const users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY, demoUsers)
    }

}


