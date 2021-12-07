import React, { useState } from 'react';
import './App.css';
import {Col, Row } from 'react-bootstrap'; //Row
import SemesterBoard from './components/SemesterBoard';
import COURSEPOOLJSON from './assets/coursePool.json'
import AddCourseForm from './components/AddCourseForm';
import { tsXLXS } from 'ts-xlsx-export';
import Header from './components/Header';
import PoolOfCourse from './components/PoolOfCourse';
import DegreeRequirementForm from './components/DegreeRequirementForm';
import Tutorials from './components/Tutorials';
import { AllUserCoursesType, courseType, defaultOb} from './interfaces/coursePool';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import cloneDeep from 'lodash/cloneDeep';


const coursePool = COURSEPOOLJSON
export const LOCAL_STRORAGE_COURSES = 'current-courses'
export const defaultSemester = [
  {semesterName: "First Fall", semesterCourses:[coursePool[0]]},
  {semesterName:"First Spring", semesterCourses:[coursePool[1],coursePool[2]]}
]
export const defaultSemesterPool = [defaultSemester[0].semesterName,defaultSemester[1].semesterName]

export const getLocalStorageCourses = ()=>{
  console.log("hello")
  let defaultCourses : string| null= localStorage.getItem((LOCAL_STRORAGE_COURSES)) //need if statement because 'null' problem
  if(defaultCourses===null){
    return [...defaultSemester]
  }else{
    return JSON.parse(defaultCourses)
  }
}
export const getLocalStorageSemester=()=>{
  let tmpSemesterPool:string[] = []
  let defaultCourses : string| null= localStorage.getItem((LOCAL_STRORAGE_COURSES)) //need if statement because 'null' problem
  if(defaultCourses===null){
    return defaultSemesterPool
  }
  else{
    let tmpDefaultCourses:AllUserCoursesType = JSON.parse(defaultCourses)
    tmpDefaultCourses.forEach(semester=>tmpSemesterPool.push(semester.semesterName))
    console.log("tmpSemesterPool: "+tmpSemesterPool)
    return tmpSemesterPool
  }
}


function App() {
  const [AllUserCourses, setAllUserCourses] = useState<AllUserCoursesType>(getLocalStorageCourses())
  const [semesterPool, setSemesterPool] = useState<string[]>(getLocalStorageSemester())
  const [showTutorial, setShowTutorial] = useState<Boolean>(true)

  const addSemester=()=>{
    let newSemesterName = semesterPool.length+1
    let tmpSemesterPool = semesterPool
    tmpSemesterPool.push("new semester "+newSemesterName)
    setAllUserCourses([ ...AllUserCourses,{semesterName: "new semester "+newSemesterName, semesterCourses:[]} ])
    setSemesterPool(tmpSemesterPool)

  }
  const addCourse = (course:courseType,semesterIndex:number) => {

        let tmpAllUserCourses = AllUserCourses;
        tmpAllUserCourses[semesterIndex].semesterCourses = [...tmpAllUserCourses[semesterIndex].semesterCourses,course]
        setAllUserCourses(tmpAllUserCourses)
        alert("add success")

  }

  const searchCourse=(id:string)=>{
    let tmpAllUserCourses = coursePool;
    let uppercase = id.toUpperCase();
    let curIndex = 0;
    let exist = false;
    tmpAllUserCourses.forEach((value,index) => {
      if (value.id===uppercase) {
        curIndex = index;
        exist = true;
      }
    })
    if (exist){ return tmpAllUserCourses[curIndex]};
    return defaultOb;
  }
  const save=()=>{
    console.log("save")
    localStorage.setItem(LOCAL_STRORAGE_COURSES,JSON.stringify(AllUserCourses))
  }

  const exportAsExcelFile =()=>{
    tsXLXS().exportAsExcelFile(AllUserCourses).saveAsExcelFile('FourYearPlan')
  } //extension auto applie , not working

  const checkPrerequisite=(requiredCourseId:string, semesterIndex:number)=>{
    let tmpPreviousCourses= AllUserCourses
    let isSatisfy = false;
    tmpPreviousCourses=AllUserCourses.filter((item, index)=> index<semesterIndex)
    tmpPreviousCourses.map(course=>course.semesterCourses.map((item, index)=>{
      if(item.id === requiredCourseId)
        isSatisfy = true
        return isSatisfy
    }))
    return isSatisfy
  }

  const checkDuplicate=(courseId:string, semesterIndex:number)=>{
    let tmpCurrentSemesterCourses:courseType[] = []
    AllUserCourses.forEach((semester, index)=>{
      if(index === semesterIndex){
        tmpCurrentSemesterCourses = semester.semesterCourses
        console.log("index: "+index)
      }
    })
    tmpCurrentSemesterCourses.forEach(course=>{
      console.log("course id " +course.id)
      if(course.id === courseId){
        console.log("return true here")
        return true;
      }
    })
    console.log("return false here")
    return false;
  }

  const editDbCourse=(tmpCourse:courseType)=>{
    let tmpCoursePool = coursePool;
    let curIndex = 0;
    tmpCoursePool.forEach((course,index)=>{if (course.id === tmpCourse.id) curIndex = index;
    })
    tmpCoursePool[curIndex] = tmpCourse;
    // setCoursePool(tmpCoursePool)
    //not finished
  }
  const clearCourses = (semesterIndex:number)=>{
    let tmpAllUserCourses = JSON.parse(JSON.stringify(AllUserCourses))
    tmpAllUserCourses[semesterIndex].semesterCourses = []
    setAllUserCourses(tmpAllUserCourses)
  }

  return (
    <div className="App">
      <Tutorials showTutorial = {showTutorial}setShowTutorial={setShowTutorial} />
      <DndProvider backend={HTML5Backend}>
        <Row>
        <Header save = {save} exportAsExcelFile={exportAsExcelFile} setShowTutorial={setShowTutorial}/>
          <Col>
            <DegreeRequirementForm AllUserCourses = {AllUserCourses}/>
            <AddCourseForm onAdd={addCourse} semesterPool={semesterPool} searchCourse={searchCourse} checkPrerequisite={checkPrerequisite}
                defaultOb={defaultOb} editDbCourse= {editDbCourse} checkDuplicate={checkDuplicate}/>
          </Col>
          <Col xs={7}>
          <button className="btn btn-success m-2" onClick={()=>addSemester() }>Add Semester</button>
          <div style={{display:'grid', gridTemplateColumns:'50% 50%'}}>
            {AllUserCourses.map((semester, index)=>
                <SemesterBoard semester = {semester} semesterIndex = {index} key={index}
                              semesterPool = {semesterPool} setSemesterPool = {setSemesterPool} checkPrerequisite={checkPrerequisite}
                              AllUserCourses = {AllUserCourses} setAllUserCourses={setAllUserCourses} searchCourse = {searchCourse}
                              checkDuplicate = {checkDuplicate} clearCourses = {clearCourses}/>)
            }
            </div>
          </Col>
          <Col className="Col"  xs={2}>
            <h1>Pool of Course</h1>
            <h3>free to drag</h3>
            {coursePool.map((course, index)=><PoolOfCourse id = {course.id} key={index}/>)}
          </Col>
        </Row>
      </DndProvider>
    </div>
  );
}

export default App;
