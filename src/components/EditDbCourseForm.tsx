import { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { courseType } from '../interfaces/coursePool'
interface editDbCourseForm{
    editDbCourse: (tmpCourse: courseType) => void
    searchCourse: (id: string) => courseType
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
    editId:string
}

const EditDbCourseForm = ({editDbCourse,searchCourse,setShowEdit,editId}:editDbCourseForm) => {
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
            <Modal show={()=>setShowEdit(true)} onHide={()=>setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Course in DB: {editId}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={onSubmitDb}>
                    <Form.Label>course id</Form.Label>
                        <p><input type='text' placeholder='edit Course id' value={id} onChange={(e)=>setId(e.target.value)}/></p>
                    <Form.Label>course name</Form.Label>
                        <p><input type='text' placeholder='edit Course name' value={name} onChange={(e)=>setName(e.target.value)}/></p>
                    <Form.Label>description</Form.Label>
                        <p><input type='text' placeholder='edit description' value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                    <Form.Label>credit</Form.Label>
                        <p><input type='number' placeholder='edit credit'value={credit}  onChange={(e)=>setCredit(parseInt(e.target.value))}/></p>
                    <Form.Label>course Required: </Form.Label>
                        <p>
                            <input type='radio'  value="true" name="required" onChange={(e)=>setRequired(true)}/>yes
                            <input type='radio'  value="false" name="required" onChange={(e)=>setRequired(false)}/>no
                        </p>
                    <Form.Label>course Elective: </Form.Label>
                        <p>
                            <input type='radio'  value="true" name="elective" onChange={(e)=>setElective(true)}/>yes
                            <input type='radio'  value="false" name="elective" onChange={(e)=>setRequired(false)}/>no
                        </p>
                    <input type="submit" className="btn btn-primary m-2" value="save course in coursepool"/>
                </Form>
            </Modal.Body>
            </Modal>
        )

}

export default EditDbCourseForm

