import React, { useState } from "react";
import { courseType } from "../interfaces/coursePool";
import EditDbCourseForm from "./EditDbCourseForm";
export interface courseInfoForm{
    tmpCourse: courseType
    showAddFail: boolean
    notSatisfiedCourses: string[]
    addCourse: (course: courseType) => void
    setShowAdd: React.Dispatch<React.SetStateAction<boolean>>
    coursePool: courseType[]
    setCoursePool: React.Dispatch<React.SetStateAction<courseType[]>>
}

const CourseInfoForm = ({tmpCourse, showAddFail, notSatisfiedCourses, addCourse,setShowAdd,coursePool,setCoursePool }:courseInfoForm):JSX.Element => {
    const [showEdit, setShowEdit] = useState(false);


    return (
        <div>
            <p>id: {tmpCourse.id}</p>
            <p>name: {tmpCourse.name}</p>
            <p>description: {tmpCourse.description}</p>
            <p>credit: {tmpCourse.credit}</p>
            {tmpCourse.required ? <p>{tmpCourse.id} is a required class</p>:<p></p>}
            {tmpCourse.elective ? <p>{tmpCourse.id} is an elective class</p>:<p></p>}
            {showAddFail ? notSatisfiedCourses.map((course,index)=><p key={index}>notSatisiedCourses: {course} is not satisifed as prerequisite in all previous semesters</p>):<p></p>}
            <button className="btn btn-success m-3" onClick={()=>addCourse(tmpCourse)}>Save Course</button>

            <button className="btn btn-primary m-3" onClick={()=>setShowEdit(true)}>Edit Course Info</button>

            {showEdit ?
                <div className='outer-diagram'>
                    <div className='diagram'>
                        <EditDbCourseForm  setShowEdit={setShowEdit}
                            editId={tmpCourse.id} setShowAdd={setShowAdd} coursePool={coursePool} setCoursePool={setCoursePool}/>
                    </div>
                </div> :
                <div></div>
            }

        </div>
    );
};

export default CourseInfoForm;
