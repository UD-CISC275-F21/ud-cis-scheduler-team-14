import React, { useState } from 'react';
import './App.css';
import Headers from './components/Header';
import Year from './components/Year';
import AddCourse from './components/AddCourse';
import {CoursePool} from './interfaces/coursePool'
import COURSESPOOL from './assets/coursesPool.json'
import SEMESTERSPOOL from './assets/semestersPool.json';

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

function App() {
  const [coursesPool] = useState<CoursePool[]>(COURSESPOOL)
  const [semesterPool] = useState<IState["semesterPool"]>(SEMESTERSPOOL)
  const [allCourses, setAllCourses] = useState(new Array())
  const [semesterIndex, setSemesterIndex] = useState<number>(0);
  

  const [firstFallCourses, setFirstFallCourses] = useState<IState["Courses"]>([
    coursesPool[0],coursesPool[18],coursesPool[24],coursesPool[25],coursesPool[19],
  ])
  const [firstSpringCourses, setFirstSpringCourses] = useState<IState["Courses"]>([
    coursesPool[1],coursesPool[2],coursesPool[22],coursesPool[20],coursesPool[21]
  ])
  const [firstWinterCourses, setFirstWinterCourses] = useState<IState["Courses"]>()
  const [firstSummerCourses, setFirstSummerCourses] = useState<IState["Courses"]>()
  const [secondFallCourses, setSecondFallCourses] = useState<IState["Courses"]>([
    coursesPool[3],coursesPool[4],coursesPool[23],coursesPool[17],coursesPool[26],
  ])
  const [secondSpringCourses, setSecondSpringCourses] = useState<IState["Courses"]>([
    coursesPool[5],coursesPool[13],coursesPool[26],coursesPool[27],coursesPool[28],
  ])
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
    console.log("addCourse"+course.name)
    if(semester==="First Year Fall"){
      const id = firstFallCourses.length + 1;
      const newCourse = { id, ...course }
      setFirstFallCourses([...firstFallCourses, newCourse])
    }
    else if(semester==="First Year Spring"){
      const id = firstSpringCourses.length + 1;
      const newCourse = { id, ...course }
      setFirstSpringCourses([...firstSpringCourses, newCourse])
    }
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

  return (
    <div className="App">
      <Headers/>

      <AddCourse onAdd={addCourse} semesterPool={semesterPool} setSemesterIndex = {setSemesterIndex} 
      searchCourse={searchCourse} checkPrerequisite = {checkPrerequisite} allCourses = {allCourses}/>

      <Year yearName = "First Year" 
        fallValue ={semesterPool[0].name} fallCourses = {firstFallCourses}  setfallCourses={setFirstFallCourses}
        springValue="Spring Semester" springCourses={firstSpringCourses} setSpringCourses={setFirstSpringCourses}
        allCourses={allCourses} setAllCourses={setAllCourses} testAddAllCourses={testAddAllCourses}
      />
      {/* <Year yearName = "Second Year" 
        fallValue ="Fall Semester" fallCourses = {secondFallCourses}  setfallCourses={setSecondFallCourses}
        springValue="Spring Semester" springCourses={secondSpringCourses} setSpringCourses={setSecondSpringCourses}
        allCourses={allCourses} setAllCourses={setAllCourses}
      /> */}
      {/* {checkPrerequisite("CISC181", allCourses[1])} */}

    </div>
  );
}
export default App;

