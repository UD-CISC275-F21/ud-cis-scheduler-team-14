import React from 'react'

const Button = ({onAdd, tasks,count}) => {
    return (
        <div>
            <button className = "btn btn-secondary m-2" onClick = {onAdd}>{count}</button>

        </div>
    )
}

export default Button
