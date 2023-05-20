const { useState, useEffect } = React

export function TodoFilter({ dispatcher, curFilterBy }) {
    const  [filterByToEdit, setFilterByToEdit] = useState(curFilterBy)

    useEffect(() => {
        dispatcher(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedFilterBy = { ...filterByToEdit, [field]: value }
        setFilterByToEdit(updatedFilterBy)
    }

    return (
        <section className="todo-filter">
            <label htmlFor="txt">Search</label>
            <input type="text" id="txt" name="txt" value={filterByToEdit.txt} onChange={handleChange} />
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={filterByToEdit.status} onChange={handleChange}>
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="active">Active</option>
            </select>
        </section>
    )
}