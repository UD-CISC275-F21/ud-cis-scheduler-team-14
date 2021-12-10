import React, { useState } from "react";
import "./App.css";
import {Col, Row } from "react-bootstrap"; //Row
import SemesterBoard from "./components/SemesterBoard";
import COURSEPOOLJSON from "./assets/coursePool.json";
import AddCourseForm from "./components/AddCourseForm";
import { tsXLXS } from "ts-xlsx-export";
import Header from "./components/Header";
import PoolOfCourse from "./components/PoolOfCourse";
import DegreeRequirementForm from "./components/DegreeRequirementForm";
import Tutorials from "./components/Tutorials";
import { AllUserCoursesType, courseType, defaultOb} from "./interfaces/coursePool";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addCourse, addSemester, getLocalStorageCourses, getLocalStorageSemester, LOCAL_STRORAGE_COURSES, searchCourse } from "./utilities/data";


function App():JSX.Element {
    const [coursePool, setCoursePool] = useState<courseType[]>(COURSEPOOLJSON);
    const [AllUserCourses, setAllUserCourses] = useState<AllUserCoursesType>(getLocalStorageCourses());
    const [semesterPool, setSemesterPool] = useState<string[]>(getLocalStorageSemester());
    const [showTutorial, setShowTutorial] = useState<boolean>(true);


    const save=()=>{
        localStorage.setItem(LOCAL_STRORAGE_COURSES,JSON.stringify(AllUserCourses));
    };

    const exportAsExcelFile =()=>{
        tsXLXS().exportAsExcelFile(AllUserCourses).saveAsExcelFile("FourYearPlan");
    }; //extension auto applie , not working

    const checkPrerequisite=(requiredCourseId:string, semesterIndex:number)=>{
        let tmpPreviousCourses:AllUserCoursesType= JSON.parse(JSON.stringify(AllUserCourses));
        let isSatisfy = false;
        tmpPreviousCourses=AllUserCourses.filter((item, index)=> index<semesterIndex);
        tmpPreviousCourses.map(course=>course.semesterCourses.map((item)=>{
            if(item.id === requiredCourseId)
                isSatisfy = true;
            return isSatisfy;
        }));
        return isSatisfy;
    };

    const checkDuplicate=(courseId:string, semesterIndex:number)=>{ //not working
        let tmpCurrentSemesterCourses:courseType[] = [];
        AllUserCourses.forEach((semester, index)=>{
            if(index === semesterIndex){
                tmpCurrentSemesterCourses = semester.semesterCourses;
                console.log("index: "+index);
            }
        });
        tmpCurrentSemesterCourses.forEach(course=>{
            console.log("course id " +course.id);
            if(course.id === courseId){
                console.log("return true here");
                return true;
            }
        });
        console.log("return false here");
        return false;
    };

    const editDbCourse=(tmpCourse:courseType, editId:string)=>{
        const tmpCoursePool:courseType[] = JSON.parse(JSON.stringify(coursePool));
        let curIndex = 0;
        tmpCoursePool.forEach((course,index)=>{
            if (course.id == editId) curIndex = index;
        });
        tmpCoursePool[curIndex] = tmpCourse;
        setCoursePool(tmpCoursePool);

    };

    return (
        <div className="App">
            <Tutorials showTutorial = {showTutorial}setShowTutorial={setShowTutorial} />
            <DndProvider backend={HTML5Backend}>
                <Row>
                    <Header save = {save} exportAsExcelFile={exportAsExcelFile} setShowTutorial={setShowTutorial}/>
                    <Col>
                        <DegreeRequirementForm AllUserCourses = {AllUserCourses}/>
                        <h1>Pool of Course</h1>
                        <h3>free to drag</h3>
                        {coursePool.map((course, index)=><PoolOfCourse id = {course.id} key={index}/>)}
                    </Col>
                    <Col xs={8}>
                        <AddCourseForm onAdd={addCourse} semesterPool={semesterPool} searchCourse={searchCourse} checkPrerequisite={checkPrerequisite}
                            defaultOb={defaultOb} editDbCourse= {editDbCourse} checkDuplicate={checkDuplicate}
                            AllUserCourses={AllUserCourses} setAllUserCourses={setAllUserCourses} coursePool={coursePool}/>
                        <button className="btn btn-success m-2" onClick={()=>addSemester(semesterPool,setAllUserCourses,AllUserCourses,setSemesterPool) }>Add Semester</button>
                        <div style={{display:"grid", gridTemplateColumns:"50% 50%"}}>
                            {AllUserCourses.map((semester, index)=>
                                <SemesterBoard semester = {semester} semesterIndex = {index} key={index}
                                    semesterPool = {semesterPool} setSemesterPool = {setSemesterPool} checkPrerequisite={checkPrerequisite}
                                    AllUserCourses = {AllUserCourses} setAllUserCourses={setAllUserCourses} searchCourse = {searchCourse}
                                    checkDuplicate = {checkDuplicate} coursePool={coursePool}/>)
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
