import React, { useState } from 'react'

interface IProps{

    editTmpId:number;
    setEditTmpId:React.Dispatch<React.SetStateAction<number >>;
    editAddCourse: (tmpCourse: any) => void
}

const EditCourse:React.FC<IProps> = ({editTmpId,setEditTmpId,editAddCourse}) => {
    const [course,setCourse] = useState('')
    const [description, setDescription] = useState("")
    const [credit, setCredit] = useState<number>()
    //semester not included, need fix
    
    const onSubmit = (e:any) =>{
        e.preventDefault();
        console.log("editTmpId: "+ editTmpId)
        const id = editTmpId

         editAddCourse({id,course,description,credit}) 
    }
    return (
        <div >
            <form onSubmit={onSubmit} >
                <p><label>course name</label></p>
                <input type='text' placeholder='edit Course name' value={course} onChange={(e)=>setCourse(e.target.value)}/>
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
