import React, { useState } from 'react'

const EditDbCourseForm = () => {
    const [name,setName] = useState('')
    const [description, setDescription] = useState("")
    const [credit, setCredit] = useState<number>()
    const [id, setId] = useState('')
    const [required, setRequired] = useState(false)
    const [elective, setElective] = useState(false)

    const onSubmitDb = (e:any) =>{
        e.preventDefault();
        
    }
    return (
        <div>
            <form onSubmit={onSubmitDb} >
            <p><label>course id</label></p>
                <input type='text' placeholder='edit Course id' value={id} onChange={(e)=>setName(e.target.value)}/>
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
                <p><input type="submit" className="btn btn-primary m-2" value="save course"/></p>
            </form>
            
        </div>
    )
}

export default EditDbCourseForm

