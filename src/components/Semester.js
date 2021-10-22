import React from 'react'

const Semester = ({value, courses, onAdd, onDelete}) => {
    return (
        <div>
            {value}
            <button class ="btn btn-primary m-2" onClick = {onAdd}>Add Class</button>
            <button class ="btn btn-primary m-2" >Delete</button>
            
            <table class = "table table-striped" border = "1px">
                <thead class="thead-dark">
                    {/* dark not working */}
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Course</th>
                        <th scope="col">Description</th>
                        <th scope="col">Credit</th>
                    </tr>
                </thead>
                {courses.map(course => <tr key={course.id}>
                    <th scope="row">{course.id}</th>
                    <td><textarea>{course.course}</textarea></td>
                    <td><textarea>{course.description}</textarea></td>
                    <td><textarea>{course.credit}</textarea></td>
                    <button class ="btn btn-primary m-2" onClick = {()=>onDelete(course.id)} >Delete</button>
                    </tr>)}
                <tr>
                    total credits: {''}
                </tr>
            </table>
        </div>
    )
}

export default Semester
