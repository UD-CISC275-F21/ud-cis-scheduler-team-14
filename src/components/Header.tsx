import React from "react";
import { AllUserCoursesType } from "../interfaces/coursePool";
import { downloadBlob, save } from "../utilities/data";
export interface Headers{
    setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>
    AllUserCourses:AllUserCoursesType
}

const Header = ({ setShowTutorial,AllUserCourses}: Headers):JSX.Element => {
    // const courseToString=(course:courseType)=>{
    //     return `${course.id},${course.name},${course.credit}`;

    // };
    const downloadCSV=(data:AllUserCoursesType)=>{
        const joined = data.map(semester=>
            `Semester Name:, ${semester.semesterName}\n`
            +"course ID, Name, Credit, Required, Elective\n"
            +semester.semesterCourses.map(course=>
                `${course.id},${course.name},${course.credit},${course.required},${course.elective}`).join("\n")
        ).join("\n\n\n");
        downloadBlob(joined,"AllUserCourses.csv","text/csv");
    };

    return (
        <nav>
            <header className="navbar navbar-light bg-light">
                <h3>CS Major Four Year Plan</h3>
                {/* - High Performance Computing Concentration */}
                <button className="btn btn-primary" onClick = {()=>save(AllUserCourses)}>Save to Local</button>

                <button className = "btn btn-primary" onClick = {()=>downloadCSV(AllUserCourses)}>export as CSV</button>
                <button className = "btn btn-primary" onClick = {()=>setShowTutorial(true)}>Tutorials</button>

            </header>
        </nav>
    );
};

export default Header;
