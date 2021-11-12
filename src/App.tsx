import React, { useState } from 'react';
import './App.css';
import Headers from './components/Header';
import Year from './components/Year';
import AddCourse from './components/AddCourse';
import {CoursePool} from './interfaces/coursePool'
import COURSESPOOL from './assets/coursesPool.json'
import SEMESTERSPOOL from './assets/semestersPool.json';
import { tsXLXS } from 'ts-xlsx-export';


 export interface IState{
  Courses:{
    id:number
    name:string
    description?:string
    credit:number
    prerequisite:Array<string> //  ?? string[]
    required:boolean
    elective:boolean
  }[] 

  semesterPool:{
    name:string
  }[]
  allCourses: {
    id: number;
    name: string;
    description?: string | undefined;
    credit: number;
    prerequisite: string[];
    required: boolean;
    elective: boolean;
}[][] | undefined
}

const defaultOb = {
  "id":1,
  "name":"",
  "description":"",
  "credit":0,
  "prerequisite":[],
  "required":true,
  "elective":false
}
export const coursesPool = COURSESPOOL
export const LOCAL_STRORAGE_COURSES = 'current-courses'
export const INITAL_COURSES = [
  coursesPool[0],coursesPool[18],coursesPool[24],coursesPool[25]
]
export const getLocalStrorageCourses = ()=>{
  let defaultCourses : string| null= localStorage.getItem((LOCAL_STRORAGE_COURSES)) //need if statement because 'null' problem
  if(defaultCourses===null){
    return [...INITAL_COURSES]
  }else{
    return JSON.parse(defaultCourses)
  }
}

function App() {
  // const [coursesPool] = useState<CoursePool[]>(COURSESPOOL)
  const [semesterPool] = useState<IState["semesterPool"]>(SEMESTERSPOOL)
  const [allCourses, setAllCourses] = useState(new Array())
  const [semesterIndex, setSemesterIndex] = useState<number>(0);

  const [firstFallCourses, setFirstFallCourses] = useState<IState["Courses"]>(getLocalStrorageCourses())
  const [firstSpringCourses, setFirstSpringCourses] = useState<IState["Courses"]>([
    coursesPool[1],coursesPool[2],coursesPool[22],coursesPool[20],coursesPool[21]
  ])
  // const [secondFallCourses, setSecondFallCourses] = useState<IState["Courses"]>([
  //   coursesPool[3],coursesPool[4],coursesPool[23],coursesPool[17],coursesPool[26],
  // ])
  // const [secondSpringCourses, setSecondSpringCourses] = useState<IState["Courses"]>([
  //   coursesPool[5],coursesPool[13],coursesPool[26],coursesPool[27],coursesPool[28],
  // ])
  // const [thirdFallCourses, setThirdFallCourses] = useState<IState["Courses"]>([
  //   coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],
  // ])
  // const [thirdSpringCourses, setThirdSpringCourses] = useState<IState["Courses"]>([
  //   coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],
  // ])
  // const [fourthFallCourses, setFourthFallCourses] = useState<IState["Courses"]>([
  //   coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],
  // ])
  // const [fourthSpringCourses, setFourthSpringCourses] = useState<IState["Courses"]>([
  //   coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],coursesPool[0],
  // ])
  allCourses.push(firstFallCourses,firstSpringCourses)
  // allCourses.push(firstSpringCourses)
  
  const addCourse = (course:any,semester:any) => { //{newCourse, semester}
    // console.log("addCourse"+course.name)
    if(semester==="First Year Fall"){
      const id = firstFallCourses.length + 1;
      // const newCourse = { id, ...course }
      course.id = id;
      setFirstFallCourses([...firstFallCourses, course])
      // sortCoursesId(firstFallCourses)

    }
    else if(semester==="First Year Spring"){
      const id = firstSpringCourses.length + 1;
      const newCourse = { id, ...course }
      setFirstSpringCourses([...firstSpringCourses, newCourse])
    }
  }
  const sortCoursesId = (courses:IState["Courses"])=>{
    let index = 1;
    courses.forEach(item => {item.id=index
      index+=1})
  }

  const testAddAllCourses = (newCourses:any)=>{
    let tmpCourse = allCourses;
    tmpCourse.push(newCourses);
    setAllCourses(tmpCourse);
  }

  const searchCourse=(name:any)=>{
    let tmpAllCourses = coursesPool;
    let uppercase = name.toUpperCase(name);
    let curIndex = 0;
    let exist = false;
    tmpAllCourses.forEach((value,index) => {
      if (value.name===uppercase) {
        curIndex = index;
        exist = true;
      }
    })
    if (exist){ return tmpAllCourses[curIndex]};
    return defaultOb;
  }
  
  const checkPrerequisite=(name:any,courses:any[])=>{
    if(name==[]){ //how to set equal to empty array
      return console.log("list is empty")
    }
    courses.forEach(item=>{
      if (item.name == name)
    return true;
  })
  return false;
  // return console.log("prerequisite name not found"+item.name);
  }

  const save=()=>{
    console.log("saved")
    localStorage.setItem(LOCAL_STRORAGE_COURSES,JSON.stringify(firstFallCourses))
  }

  const exportAsExcelFile =()=>{
    tsXLXS().exportAsExcelFile(firstSpringCourses).saveAsExcelFile('FourYearPlan')
  } //extension auto applie

  // const importExcelFile=()=>{
  //   const fs = require("fs")
  //   const XLSX = require("xlsx")
  //   // const jsontoxml = require("jsontoxml")
  //    const workbook = XLSX.readFile("csvTest.csv")
  //    return workbook;
  // }



  return (
    <div className="App">
      <Headers save = {save} exportAsExcelFile = {exportAsExcelFile}/>

      <AddCourse onAdd={addCourse} semesterPool={semesterPool} setSemesterIndex = {setSemesterIndex} 
      searchCourse={searchCourse} checkPrerequisite = {checkPrerequisite} allCourses = {allCourses}/>

      <Year yearName = "First Year" 
        fallValue ={semesterPool[0].name} fallCourses = {firstFallCourses}  setfallCourses={setFirstFallCourses}
        springValue="Spring Semester" springCourses={firstSpringCourses} setSpringCourses={setFirstSpringCourses}
        allCourses={allCourses} setAllCourses={setAllCourses} testAddAllCourses={testAddAllCourses}
        sortCoursesId = {sortCoursesId}
      />
      {/* <Year yearName = "Second Year" 
        fallValue ="Fall Semester" fallCourses = {secondFallCourses}  setfallCourses={setSecondFallCourses}
        springValue="Spring Semester" springCourses={secondSpringCourses} setSpringCourses={setSecondSpringCourses}
        allCourses={allCourses} setAllCourses={setAllCourses}
        sortCoursesId = {sortCoursesId}
      /> */}
      {/* {checkPrerequisite("CISC181", allCourses[1])} */}



    </div>
  );
}
export default App;

