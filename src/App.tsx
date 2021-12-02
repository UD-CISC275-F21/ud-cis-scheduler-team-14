import React, { useState } from 'react';
import './App.css';
import {Col, Row } from 'react-bootstrap';
import SemesterBoard from './components/SemesterBoard';
import COURSEPOOLJSON from './assets/coursePool.json'
import AddCourseForm from './components/AddCourseForm';
import { tsXLXS } from 'ts-xlsx-export';
import Header from './components/Header';
import PoolOfCourse from './components/PoolOfCourse';
import DegreeRequirementForm from './components/DegreeRequirementForm';
import Tutorials from './components/Tutorials';
import { AllUserCoursesType, courseType, defaultOb} from './interfaces/coursePool';


const coursePool = COURSEPOOLJSON
export const LOCAL_STRORAGE_COURSES = 'current-courses'
export const defaultSemester = [
  {semesterName: "First Fall", semesterCourses:[coursePool[0]]},
  {semesterName:"First Spring", semesterCourses:[coursePool[1],coursePool[2]]}
]
export const defaultSemesterPool = [defaultSemester[0].semesterName,defaultSemester[1].semesterName]

export const getLocalStorageCourses = ()=>{
  let defaultCourses : string| null= localStorage.getItem((LOCAL_STRORAGE_COURSES)) //need if statement because 'null' problem
  if(defaultCourses===null){
    return [...defaultSemester]
  }else{
    return JSON.parse(defaultCourses)
  }
}
const getLocalStorageSemester=()=>{
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
    localStorage.setItem(LOCAL_STRORAGE_COURSES,JSON.stringify(AllUserCourses))
  }

  const exportAsExcelFile =()=>{
    tsXLXS().exportAsExcelFile(AllUserCourses).saveAsExcelFile('FourYearPlan')
  } //extension auto applie , not working 

  const checkPrerequisite=(requiredCourseId:string, semesterIndex:number)=>{
    let tmpPreviousCourses= AllUserCourses
    let isSatisfy = false;
    tmpPreviousCourses=AllUserCourses.filter((item, index)=> index<semesterIndex)
    // console.log("tmpPreviousCourses: "+tmpPreviousCourses.map(item=>item.semesterCourses.map(item=>item.id))+
    // "semesterIndex: "+semesterIndex)
    tmpPreviousCourses.map(course=>course.semesterCourses.map((item, index)=>{
      if(item.id === requiredCourseId)
        isSatisfy = true
        return isSatisfy
    }))
    return isSatisfy    
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
  // const checkDuplicateCourse=(tmpCourse:courseType)=>{

  // }
  return (
    <div className="App">
      <Tutorials/>
      <Row>
        <Header save = {save} exportAsExcelFile={exportAsExcelFile}/>
        <Col className="PoolOfCourse">
          <h1>Pool of Course</h1>
          <h3>free to drag</h3>
          {coursePool.map((course, index)=><PoolOfCourse id = {course.id} key={index}/>)}
        </Col>
        <Col>
          <DegreeRequirementForm AllUserCourses = {AllUserCourses}/>
          <button className="btn btn-success m-2" onClick={()=>addSemester() }>Add Semester</button>

          <AddCourseForm onAdd={addCourse} semesterPool={semesterPool} searchCourse={searchCourse} checkPrerequisite={checkPrerequisite} 
              defaultOb={defaultOb} editDbCourse= {editDbCourse}/>
          
          {AllUserCourses.map((semester, index)=> 
              <SemesterBoard semester = {semester} semesterIndex = {index} key={index}
                             semesterPool = {semesterPool} setSemesterPool = {setSemesterPool} checkPrerequisite={checkPrerequisite}
                             AllUserCourses = {AllUserCourses} setAllUserCourses={setAllUserCourses} searchCourse = {searchCourse}/>)
          }
        </Col>
      </Row>
    </div>
    
  );
}

export default App;
