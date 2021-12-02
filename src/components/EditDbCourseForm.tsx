import { useState } from 'react'
import { courseType } from '../interfaces/coursePool'
interface editDbCourseForm{
    editDbCourse: (tmpCourse: courseType) => void
    searchCourse: (id: string) => courseType
}

const EditDbCourseForm = ({editDbCourse,searchCourse}:editDbCourseForm) => {
    const [name,setName] = useState('')
    const [description, setDescription] = useState("")
    const [credit, setCredit] = useState<number>(0)
    const [id, setId] = useState('')
    const [required, setRequired] = useState(false)
    const [elective, setElective] = useState(false)
    const [prerequisite, setPrerequisite] = useState<string[]>([]) //need revise

    const onSubmitDb = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let tmpCourse = searchCourse(id)
        setPrerequisite(tmpCourse.prerequisite) 
        editDbCourse({name, description, credit, id, required, elective, prerequisite})
        setPrerequisite([])
        
    }
    return (
        <div>
            <form onSubmit={onSubmitDb} >
            <p><label>course id</label></p>
                <input type='text' placeholder='edit Course id' value={id} onChange={(e)=>setId(e.target.value)}/>
                <p><label>course name</label></p>
                <input type='text' placeholder='edit Course name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <p><label>description</label></p>
                <input type='text' placeholder='edit description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <p><label>credit</label></p>
                <input type='number' placeholder='edit credit'value={credit}  onChange={(e)=>setCredit(parseInt(e.target.value))}/>
                <p><label>course Required: </label></p>
                <input type='radio'  value="true" name="required" onChange={(e)=>setRequired(true)}/>yes 
                <input type='radio'  value="false" name="required" onChange={(e)=>setRequired(false)}/>no 
                <p><label>course Elective: </label></p>
                <input type='radio'  value="true" name="elective" onChange={(e)=>setElective(true)}/>yes 
                <input type='radio'  value="false" name="elective" onChange={(e)=>setRequired(false)}/>no 
                <p><input type="submit" className="btn btn-primary m-2" value="save course in coursepool"/></p>
            </form>
            
        </div>
    )
}

export default EditDbCourseForm

