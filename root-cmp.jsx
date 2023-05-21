const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { store } from "./store/store.js"
import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { TodoApp } from "./views/todo-app.jsx"
import { TodoAddEdit } from "./views/todo-edit.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { AppFooter } from "./cmps/app-footer.jsx"
import { UserProfile } from "./views/user-profile.jsx"



export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className="flex">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/todo" element={<TodoApp/>}/>
                        <Route path="/todo/edit" element={<TodoAddEdit/>}/>
                        <Route path="/todo/edit/:todoId" element={<TodoAddEdit/>}/>
                        <Route path="/user-profile" element={<UserProfile/>}/>
                    </Routes>
                    </main>
                    <UserMsg />
                    <AppFooter />
                </section>
            </Router>
        </Provider>)
}
