import React, { useState } from 'react'
import EditDbCourseForm from './EditDbCourseForm'
export interface courseInfoForm{
    tmpCourse: {
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: string[];
        required: boolean;
        elective: boolean;
    } 
    showAddFail: boolean
    notSatisfiedCourses: string[]
    addCourse: (course: any) => void

}

const CourseInfoForm = ({tmpCourse, showAddFail, notSatisfiedCourses, addCourse }:courseInfoForm) => {
    const [showEdit, setShowEdit] = useState(false)

    const editCourseInDb=()=>{

    }
    return (
        <div>
            <p>id: {tmpCourse.id}</p>
            <p>name: {tmpCourse.name}</p>
            <p>description: {tmpCourse.description}</p>
            <p>credit: {tmpCourse.credit}</p>
            {tmpCourse.required ? <p>{tmpCourse.id} is a required class</p>:<p></p>}
            {tmpCourse.elective ? <p>{tmpCourse.id} is an elective class</p>:<p></p>}
            {showAddFail ? notSatisfiedCourses.map(course=><p>notSatisiedCourses: {course} is not satisifed as prerequisite in all previous semesters</p>):
              <button className="btn btn-primary m-3" onClick={()=>addCourse(tmpCourse)}>Save Course</button>
            }
            <button className="btn btn-primary m-3" onClick={()=>setShowEdit(true)}>Edit Course Info</button>
            {showEdit ?
                <div className='outer-diagram'>
                    <div className='diagram'>
                    <EditDbCourseForm   />
                    <button className='diagram-cancel btn btn-primary' onClick={()=>setShowEdit(false)}>cancel</button>
                    </div>
                </div> :
                <div></div>
                }
        
    </div>
    )
}

export default CourseInfoForm
