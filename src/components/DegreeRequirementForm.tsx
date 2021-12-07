// import React from 'react'
import { Alert } from 'react-bootstrap'
import { AllUserCoursesType } from '../interfaces/coursePool'
interface degreeRequirementForm{
    AllUserCourses: AllUserCoursesType
}

const DegreeRequirementForm = ({AllUserCourses}:degreeRequirementForm) => {
        const degreeCreditCount=()=>{
            let count = 0
            AllUserCourses.map(semester=>semester.semesterCourses.map(course=>count += course.credit))
            return count
        }
        const electiveCoursesCount=()=>{
            let count = 0
            AllUserCourses.forEach(semester=>semester.semesterCourses.forEach(course=>
                {if(course.elective)
                    count+=1}
            ))
            return count
        }
        const requiredCoursesCount=()=>{
            let count = 0
            AllUserCourses.forEach(semester=>semester.semesterCourses.forEach(course=>
                {if(course.required)
                    count+=1}
            ))
            return count
        }

    return (
        <div className="form-control">
            <h2>Degree Requirement</h2>
            <Alert variant={degreeCreditCount()>=120?'success':'warning'}>Credits:  {degreeCreditCount()} / 120</Alert>
            <Alert variant={requiredCoursesCount()>=2?'success':'warning'}>Required Classes: The degree must have ?? required classes  {requiredCoursesCount()} / ?? </Alert>
            <Alert variant={electiveCoursesCount()===3?'success':'warning'}>Electives: The degree must have at least 3 technical electives  {electiveCoursesCount()} / 3 </Alert>

        </div>
    )
}

export default DegreeRequirementForm
