const { Link, NavLink, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

import { func } from 'prop-types'
import { logout } from '../store/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()
    const user = useSelector((storeState) => storeState.loggedInUser)
    
    function onLogout() {
        logout()
        // navigate('/')
    }
    return <header className="main-header full">
        <Link to="/">
            <h3>Let`s Do!</h3>
        </Link>
        {user && <section className="user-info">
                <p>{user.fullname} </p>
                <button onClick={onLogout}>Logout</button>
            </section>}
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/todo">Todo</NavLink>
        </nav>
    </header>
}
