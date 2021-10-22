import React from 'react'

const Year = ({value, onShow}) => {
    return (
        <div >
            {value}
            <button className ="btn btn-primary m-2" onClick = {onShow}>Add Semester</button>
            <button className ="btn btn-primary m-2" >Delete</button>
        </div>
    )
}

export default Year
