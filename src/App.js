import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import Header from './components/Header'
import { useState } from "react"
import Year from './components/Year';
import Semester from './components/Semester';
import AddCourse from './components/AddCourse';
import Sampletable from './components/Sampletable';


const App = ()=>{
  const [showSemester, setShowSemester]= useState(false)

  const [courses, setCourses] = useState([
    {
      id:1,
      semester:"fall",
      course:"cisc275",
      description:"very hard frontend class",
      credit: 3
    },
    {
      id:2,
      semester:"fall",
      course:"cisc108",
      description:"beginner sighs",
      credit: 3      
    },
    {
      id:3,
      semester:"fall",
      course:"cisc220",
      description:"data structure",
      credit: 3      
    }

  ])
  const addCourse=(course)=>{ 
    const id = courses.length+1;
    const newCourse = {id,...course}
    setCourses([...courses,newCourse]) 
  }
  const deleteCourse=(id)=>{ //default id is not the same as course.id 
    setCourses(courses.filter( (course)=> course.id!==id))
  }

  return (
    <div className="App">
      <Header />
      <Sampletable/>
      <Year value = 'First Year' onShow={()=>setShowSemester(!showSemester)} />
      {showSemester && <Semester value = 'fall semester' courses = {courses} onAdd = {addCourse} onDelete = {deleteCourse} /> }
      <Year value = 'Second Year' />
    </div>
  );
}

export default App;

