import React, { useState } from 'react'
// import {IState as Props} from '../App'

interface IProps{
    onAdd:(course: any) => void
}

const AddCourse:React.FC<IProps> = ({onAdd}) => {
    const [course,setCourse] = useState('')
    const [semester,setSemester] = useState("")
    const [description, setDescription] = useState("")
    const [credit, setCredit] = useState<number>()

    const onSubmit =(e:any)=>{
        e.preventDefault(); 

        onAdd({course,semester,description,credit});

        setCourse('')
        setSemester("")
        setDescription('')
        setCredit(3)
    }

    return (
        <div>
            <form className='add-form'onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Course </label>
                    <input type='text' placeholder='Add Course' value={course} onChange={(e)=>setCourse(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Semester </label>
                    <input type='text' placeholder='Add Semester' value={semester} onChange={(e)=>setSemester(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Description </label>
                    <input type='text' placeholder='Add Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Credit </label>
                    <input type='number' placeholder='Add credit'value={credit}  onChange={(e)=>setCredit(parseInt(e.target.value))}/>
                </div>
                <input type='submit' className='btn btn-primary'value='save course'/>
            </form>
        </div>
    )
}

export default AddCourse
