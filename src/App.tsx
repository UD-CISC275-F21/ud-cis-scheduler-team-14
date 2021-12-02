import React, { useState } from 'react';
import './App.css';
import {Col, Row ,Button} from 'react-bootstrap';
import SemesterBoard from './components/SemesterBoard';
import COURSEPOOLJSON from './assets/coursePool.json'
import AddCourseForm from './components/AddCourseForm';
import { tsXLXS } from 'ts-xlsx-export';
import Header from './components/Header';
import DraggableCourse from './components/DraggableCourse';


const coursePool = COURSEPOOLJSON
export const LOCAL_STRORAGE_COURSES = 'current-courses'
const defaultSemester = [
  {semesterName: "first fall", semesterCourses:[coursePool[0]]},
  {semesterName:"first spring", semesterCourses:[coursePool[1],coursePool[2], coursePool[3]]}
]
const defaultSemesterPool = ["first fall", "first spring"]
const defaultOb = {
  "id":"not found",
  "name":"",
  "description":"",
  "credit":0,
  "prerequisite":[],
  "required":false,
  "elective":false
}
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
    let tmpDefaultCourses:{
      semesterName: string;
      semesterCourses: {
          id: string;
          name: string;
          description: string;
          credit: number;
          prerequisite: string[];
          required: boolean;
          elective: boolean;
      }[];
    }[] = JSON.parse(defaultCourses)
    tmpDefaultCourses.forEach(semester=>tmpSemesterPool.push(semester.semesterName))
    console.log("tmpSemesterPool: "+tmpSemesterPool)
    return tmpSemesterPool
  }
} 


function App() {
  const [AllUserCourses, setAllUserCourses] = useState<{
    semesterName: string;
    semesterCourses: {
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: string[];
        required: boolean;
        elective: boolean;
    }[];
  }[]>(getLocalStorageCourses())
  const [semesterPool, setSemesterPool] = useState<string[]>(getLocalStorageSemester())

  const addSemester=()=>{
    let newSemesterName = semesterPool.length+1
    let tmpSemesterPool = semesterPool
    tmpSemesterPool.push("semester "+newSemesterName)
    setAllUserCourses([ ...AllUserCourses,{semesterName: "semester "+newSemesterName, semesterCourses:[]} ])
    setSemesterPool(tmpSemesterPool)

  }
  const addCourse = (course:{
                              id: string;
                              name: string;
                              description: string;
                              credit: number;
                              prerequisite: string[];
                              required: boolean;
                              elective: boolean;
                          },semesterIndex:number) => { 
      
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
    }
    ))
    // console.log("requiredCourseId: "+requiredCourseId+" isSatisfy: "+ isSatisfy)
    return isSatisfy    
  }

  const editDbCourse=(tmpCourse:{
    id: string;
    name: string;
    description: string;
    credit: number;
    prerequisite: string[];
    required: boolean;
    elective: boolean;
})=>{
    let tmpCoursePool = coursePool;
    let curIndex = 0;
    tmpCoursePool.forEach((course,index)=>{if (course.id === tmpCourse.id) curIndex = index;
    })
    tmpCoursePool[curIndex] = tmpCourse;
    // setCoursePool(tmpCoursePool)
    //not finished
}


  return (
    
    <div className="App">
      <Row>
        <Header save = {save} exportAsExcelFile={exportAsExcelFile}/>
        <Col >
          <h1>Course Pool</h1>
          <h3>drag to semester table</h3>
          {coursePool.map(course=><DraggableCourse id={course.id} />)}
        </Col>
        <Col>
          <Button className="btn btn-primary m-2" onClick={()=>addSemester() }>Add Semester</Button>

          <AddCourseForm onAdd={addCourse} semesterPool={semesterPool} searchCourse={searchCourse} 
          checkPrerequisite={checkPrerequisite} defaultOb={defaultOb} editDbCourse= {editDbCourse}/>
          
          {AllUserCourses.map((semester, index)=> <SemesterBoard semester = {semester} semesterIndex = {index} 
                                                semesterPool = {semesterPool} setSemesterPool = {setSemesterPool} checkPrerequisite={checkPrerequisite}
                                                AllUserCourses = {AllUserCourses} setAllUserCourses={setAllUserCourses} searchCourse = {searchCourse}/>)
          }
        </Col>
      </Row>

    </div>
    
  );
}

export default App;
