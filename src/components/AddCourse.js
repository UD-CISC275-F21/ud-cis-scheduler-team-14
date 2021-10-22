import React from 'react'
import { useState } from 'react'

const AddCourse = ({onAdd}) => {
    const [course,setCourse] = useState('')
    const [description, setDescription] = useState('')
    const [credit, setCredit] = useState(3)

    const onSubmit =(e)=>{
        e.preventDefault(); 

        onAdd({course,description,credit});
            setCourse('')
            setDescription('')
            setCredit(3)
    }

    return (
        <div>
            <tr>
                <td><textarea></textarea></td>
                <td><textarea></textarea></td>
                <td><textarea></textarea></td>
            </tr>
        </div>
    )
}

export default AddCourse
