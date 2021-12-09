import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { courseType } from "../interfaces/coursePool";

interface editCourseForm{
    editTmpId:string;
    editCourseForm: (tmpCourse: courseType) => void
    setShowEditDiagram: React.Dispatch<React.SetStateAction<boolean>>
    searchCourse: (id: string) => courseType
}

const EditCourseForm = ({editTmpId,editCourseForm,setShowEditDiagram, searchCourse}:editCourseForm):JSX.Element => {
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [credit, setCredit] = useState<number>(0);

    const onSubmitPlan = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const id = editTmpId;
        const tmpCourse = searchCourse(id);
        const prerequisite  = tmpCourse.prerequisite;
        const required = tmpCourse.required;
        const elective = tmpCourse.elective;

        editCourseForm({id,name,description,credit,prerequisite,required,elective}); //why parameter name has to be the same as interface type name
    };
    return (
        <Modal show={()=>setShowEditDiagram(true)} onHide={()=>setShowEditDiagram(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course: {editTmpId}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={onSubmitPlan} >
                    <Form.Label>course name</Form.Label>
                    <p> <input type='text' placeholder='edit Course name' value={name} onChange={(e)=>setName(e.target.value)}/></p>
                    <Form.Label>description</Form.Label>
                    <p><input type='text' placeholder='edit description' value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                    <Form.Label>credit</Form.Label>
                    <p><input type='number' placeholder='edit credit'value={credit}  onChange={(e)=>setCredit(parseInt(e.target.value))}/></p>
                    <p><input type="submit" className="btn btn-success m-2" value="Save Change"/>
                    </p>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCourseForm;
