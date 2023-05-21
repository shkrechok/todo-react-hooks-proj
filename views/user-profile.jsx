const { useSelector, useDispatch } = ReactRedux
const { useEffect, useState } = React

import { save } from "../lib/babel"
import { SET_USER, SET_USER_PREFS } from "../store/store.js"
import { updateUserPrefs} from "../store/user.actions.js"
import "../assets/css/setup/variables.css"

export function UserProfile() {
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.loggedInUser)
    const defaultStyle = { fullname: 'Guest', bgColor: '#ADD8E6', fontColor: '#00008B' }
    const [currUserPrefs, setCurrUserPrefs] = useState(user.prefs && Object.keys(user.prefs).length !== 0 ? { ...user.prefs } : { ...defaultStyle })


    useEffect(() => {
        console.log('user.prefs', user.prefs)
        console.log('currUserPrefs', currUserPrefs)
        console.log('user', user)
        document.documentElement.style.setProperty('--main-bg-color', currUserPrefs.bgColor)
       // setCurrUserPrefs()
    }, [currUserPrefs])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedPrefs = { ...currUserPrefs, [field]: value }
        setCurrUserPrefs(updatedPrefs)
    }
    

    // todo: change the color vars values css on dom
    function onSetUserPrefs(ev) {
        ev.preventDefault()
        updateUserPrefs(currUserPrefs, user._id).catch(err => {
            console.log('Cannot save user prefs', err)
        }
        )
    }


    return  <section className="user-profile">
        <h1>User Profile Page</h1>
        <h2>{currUserPrefs.fullname}</h2>
        <form onSubmit={onSetUserPrefs}>
            <label htmlFor="fullname">Prefered full name</label>
            <input  type="text" id="fullname" name="fullname" value={currUserPrefs.fullname} onChange={handleChange} />
            <label htmlFor="bgColor" id="bgColor">Main frame color</label>
            <input  type="color" id="fontColor" name="bgColor" value={currUserPrefs.bgColor} onChange={handleChange} />
            <label htmlFor="fontColor">Font Color</label>
            <input  type="color" id="fontColor" name="fontColor" value={currUserPrefs.fontColor} onChange={handleChange} />
            <button>Save</button>
        </form>
    </section>
}
