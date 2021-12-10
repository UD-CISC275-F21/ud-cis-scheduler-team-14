import React, { useState } from "react";
import "./App.css";
import {Col, Row } from "react-bootstrap"; //Row
import SemesterBoard from "./components/SemesterBoard";
import COURSEPOOLJSON from "./assets/coursePool.json";
import AddCourseForm from "./components/AddCourseForm";
// import { tsXLXS } from "ts-xlsx-export";
import Header from "./components/Header";
import PoolOfCourse from "./components/PoolOfCourse";
import DegreeRequirementForm from "./components/DegreeRequirementForm";
import Tutorials from "./components/Tutorials";
import { AllUserCoursesType, courseType, defaultOb} from "./interfaces/coursePool";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addCourse, addSemester, getLocalStorageCourses, getLocalStorageSemester } from "./utilities/data";

function App():JSX.Element {
    const [coursePool, setCoursePool] = useState<courseType[]>(COURSEPOOLJSON);
    const [AllUserCourses, setAllUserCourses] = useState<AllUserCoursesType>(getLocalStorageCourses());
    const [semesterPool, setSemesterPool] = useState<string[]>(getLocalStorageSemester());
    const [showTutorial, setShowTutorial] = useState<boolean>(true);

    // const exportAsExcelFile =()=>{
    //     tsXLXS().exportAsExcelFile(AllUserCourses).saveAsExcelFile("FourYearPlan");
    // }; //extension auto applie , not working

    return (
        <div className="App">
            <Tutorials showTutorial = {showTutorial}setShowTutorial={setShowTutorial} />
            <DndProvider backend={HTML5Backend}>
                <Row>
                    <Header  setShowTutorial={setShowTutorial} AllUserCourses={AllUserCourses}/>
                    <Col>
                        <DegreeRequirementForm AllUserCourses = {AllUserCourses}/>
                        <h1>Pool of Course</h1>
                        <h3>free to drag</h3>
                        {coursePool.map((course, index)=><PoolOfCourse id = {course.id} key={index}/>)}
                    </Col>
                    <Col xs={8}>
                        <AddCourseForm onAdd={addCourse} semesterPool={semesterPool}
                            defaultOb={defaultOb}
                            AllUserCourses={AllUserCourses} setAllUserCourses={setAllUserCourses} coursePool={coursePool} setCoursePool={setCoursePool}/>
                        <button className="btn btn-success m-2" onClick={()=>addSemester(semesterPool,setAllUserCourses,AllUserCourses,setSemesterPool) }>Add Semester</button>
                        <div style={{display:"grid", gridTemplateColumns:"50% 50%"}}>
                            {AllUserCourses.map((semester, index)=>
                                <SemesterBoard semester = {semester} semesterIndex = {index} key={index}
                                    semesterPool = {semesterPool} setSemesterPool = {setSemesterPool}
                                    AllUserCourses = {AllUserCourses} setAllUserCourses={setAllUserCourses}
                                    coursePool={coursePool}/>)
                            }
                        </div>
                    </Col>
                    {/* <Col className="Col"  xs={2}>
                    </Col> */}
                </Row>
            </DndProvider>
        </div>
    );
}

export default App;
