import React from 'react'

const Year = ({value, onShow}) => {
    return (
        <div >
            {value}
            <button class ="btn btn-primary m-2" onClick = {onShow}>Add Semester</button>
            <button class ="btn btn-primary m-2" >Delete</button>
        </div>
    )
}

export default Year
