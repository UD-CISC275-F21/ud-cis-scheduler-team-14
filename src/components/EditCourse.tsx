import React, { useState } from 'react'

interface IProps{
    editTmpId:number;
    editAddCourse: (tmpCourse: any) => void
}

const EditCourse:React.FC<IProps> = ({editTmpId,editAddCourse}) => {
    const [name,setName] = useState('')
    const [description, setDescription] = useState("")
    const [credit, setCredit] = useState<number>()
    
    const onSubmit = (e:any) =>{
        e.preventDefault();
        const id = editTmpId

         editAddCourse({id,name,description,credit}) //why parameter name has to be the same as interface type name
    }
    return (
        <div >
            <form onSubmit={onSubmit} >
                <p><label>course name</label></p>
                <input type='text' placeholder='edit Course name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <p><label>description</label></p>
                <input type='text' placeholder='edit description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <p><label>credit</label></p>
                <input type='number' placeholder='edit credit'value={credit}  onChange={(e)=>setCredit(parseInt(e.target.value))}/>

                <p><input type="submit" className="btn btn-primary m-2" value="save course"/></p>
            </form>
        </div>
    )
}

export default EditCourse
