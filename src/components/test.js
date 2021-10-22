import React from 'react'

const test = ({tasks, count}) => {
    return (
        <div>
            {tasks.map(task => <h2 key={task.id}>{task.id}</h2>)}
        </div>
    )
}

export default test
