import React from "react";
import { AllUserCoursesType } from "../interfaces/coursePool";
import { save } from "../utilities/data";
export interface Headers{
    exportAsExcelFile: () => void
    setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>
    AllUserCourses:AllUserCoursesType
}

const Header = ({ exportAsExcelFile,setShowTutorial,AllUserCourses}: Headers):JSX.Element => {
    return (
        <nav>
            <header className="navbar navbar-light bg-light">
                <h3>CS Major Four Year Plan</h3>
                {/* - High Performance Computing Concentration */}
                <button className="btn btn-primary" onClick = {()=>save(AllUserCourses)}>Save to Local</button>

                <button className = "btn btn-primary" onClick = {exportAsExcelFile}>export as XLSX</button>
                <button className = "btn btn-primary" onClick = {()=>setShowTutorial(true)}>Tutorials</button>

            </header>
        </nav>
    );
};

export default Header;
