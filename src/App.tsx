import React, { useState } from 'react';
import './App.css';
import Headers from './components/Header';
import Year from './components/Year';
import Semester from './components/Semester';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';

 export interface IState{
  Courses:{
    id:number,
    semester:string,
    course:string,
    description?:string,
    credit:number;
  }[] //do not forget!!!!!!
  value:string
  showSemester:boolean;
  showSecondSemester:boolean;

}

function App() {
  const [showdiagram, setShowdiagram] = useState(false);
  const [showSemester, setShowSemester] = useState(true)
  const [showSecondSemester, setShowSecondSemester] = useState(true)
  const [editTmpId,setEditTmpId] = useState<number>(0);

  const [fallCourses, setFallCourses] = useState<IState["Courses"]>([
    {
      id: 11,
      semester: "fall",
      course: "cisc275",
      description: "very hard frontend class",
      credit: 3
    },
    {
      id: 12,
      semester: "fall",
      course: "cisc108",
      description: "beginner sighs",
      credit: 3
    },
    {
      id: 13,
      semester: "fall",
      course: "cisc220",
      description: "data structure",
      credit: 3
    }

  ])
  const [springCourses, setSpringCourses] = useState<IState["Courses"]>([
    {
      id: 21,
      semester: "spring",
      course: "cisc475",
      description: "data base",
      credit: 3
    },
    {
      id: 22,
      semester: "spring",
      course: "cisc600",
      description: "i do not know",
      credit: 3
    }

  ])
  const addCourse = (course:any) => {
    if(course.semester==="fall"){
      const id = fallCourses.length + 1;
      const newCourse = { id, ...course }
      setFallCourses([...fallCourses, newCourse])
    }
    else if(course.semester==="spring"){
      const id = springCourses.length + 1;
      const newCourse = { id, ...course }
      setSpringCourses([...springCourses, newCourse])
    }

  }
  const deleteCourse = (id:any) => { 
    setFallCourses(fallCourses.filter((course) => course.id !== id))
  }

  const cancelDiagram = () => {
    setShowdiagram(false);
  }

  const editCourse = (id:any) => {
    setShowdiagram(true);
    const tmpCourse = fallCourses.filter((res)=>{
      return res.id === id;
    });
    setEditTmpId(tmpCourse[0].id); //this line has a fixed number
  }

  const editAddCourse=(tmpCourse:any)=>{
    // setFallCourses(fallCourses.filter((course) => {return course.id !== tmpCourse.id}))
    // const newFallCourses = fallCourses.filter((course) => {return course.id !== tmpCourse.id})
    let curIndex = 0;
    const curCourse = JSON.parse(JSON.stringify(fallCourses));
    fallCourses.forEach((course,index) => {
      if (course.id === tmpCourse.id) curIndex = index;
    })
    curCourse[curIndex] = tmpCourse;
    setFallCourses(curCourse);
    setShowdiagram(false);
  }

  return (
    <div className="App">
      <Headers/>
      <AddCourse onAdd={addCourse}/>
      <Year value = "First Year" setShowSemester={setShowSemester} showSemester={showSemester} onSecondShow={() => setShowSecondSemester(!showSecondSemester)}/>
      {showdiagram? 
             <div className='outer-diagram'>
                 <div className='diagram'>
                   <EditCourse  editTmpId={editTmpId} setEditTmpId={setEditTmpId} editAddCourse={editAddCourse}/>
                   <button className='diagram-cancel' onClick={cancelDiagram}>cancal</button>
                 </div>
             </div> :
             <div></div>
      }
      <div>
        {showSemester && <Semester value ="Fall Semester" Courses = {fallCourses}  onDelete={deleteCourse} setCourses={setFallCourses} editCourse={editCourse}/>}
        {showSecondSemester && <Semester value='Spring Semester' Courses = {springCourses}  onDelete={deleteCourse} setCourses={setSpringCourses} editCourse={editCourse}/>}
      </div>
    </div>
  );
}

export default App;
