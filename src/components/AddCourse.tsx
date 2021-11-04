import React, { useState } from 'react'
import {IState as Props} from '../App'
import { CoursePool } from '../interfaces/coursePool'

interface IProps{
    onAdd: (course: any, semester: any) => void
    semesterPool:Props["semesterPool"]
    setSemesterIndex: React.Dispatch<React.SetStateAction<number>>
    searchCourse: (name: any) => CoursePool
    checkPrerequisite: (name: any, courses: any[]) => false | void
    allCourses: any[]
}
const AddCourse:React.FC<IProps> = ({onAdd, semesterPool, setSemesterIndex, searchCourse, checkPrerequisite, allCourses}) => {
    const [showAdd, setShowAdd] = useState(false)
    const [name,setName] = useState('')
    const [semester,setSemester] = useState("")
    const [tmpCourse, setTmpCourse] = useState<CoursePool>() 


    const onSubmit =(e:any)=>{
        e.preventDefault(); 
        const tmpCourse =searchCourse(name);

        let curIndex = 0;
        let exist = false;
        semesterPool.forEach((value,index) => {
            if (value.name===semester){
              curIndex = index;
              exist = true;
            }
          })
        if (exist) {
            setSemesterIndex(curIndex)
            setTmpCourse(tmpCourse)
            setShowAdd(!showAdd)
        }
        else {
            alert("semester not found")
        }
        

        const prerequisiteClasses = tmpCourse.prerequisite;
        let previousCourses = allCourses;
        previousCourses.filter(index=> index<curIndex)
        previousCourses.forEach(item=>console.log(item)) //not finished

        let notSatisfiedCourses = new Array();
        prerequisiteClasses.forEach(item=>{
            if(checkPrerequisite(item,allCourses[curIndex])==false){
                notSatisfiedCourses.push(item)
            }
        })
        console.log("semester index: "+ curIndex)
        console.log("notSatisfiedCourses: "+ notSatisfiedCourses);
        // console.log("allCourses[curIndex]: "+ previousCourses[curIndex].forEach(item=>console.log(item.name)))
    
    }


    const addCourse=(course:any)=>{
        
         onAdd(course,semester);

        setTmpCourse(undefined);
        setName('');
        
        setShowAdd(!showAdd)
        setName('')
        setSemester('');
    }

    return (
        <div>
            <form className='add-form'onSubmit={onSubmit}>
                <div className='form-control'>                    
                    <label>Semester </label>
                    <select className="form-control"name="name" value={semester} onChange={(e)=>{
                        setSemester(e.target.value);
                        // console.log('value is ' + e.target.value)
                        }}>
                        <option>select a semester</option>
                        {semesterPool.map(semester=><option>{semester.name}</option>)}
                    </select>
                </div>
                <div className='form-control'>
                    <label>Course </label>
                    <input type='text' placeholder='Add Course. Ex. CISC106' value={name} onChange={
                        (e)=>{
                            setName(e.target.value)
                            // console.log('value is ' + e.target.value)
                        }}
                        />
                </div>
                {<input type='submit' className='btn btn-primary'value='Search Course'/>}
            </form>

            {showAdd && 
            <div>
                <p>name: {tmpCourse?.name}</p>
                <p>description: {tmpCourse?.description}</p>
                <p>credit: {tmpCourse?.credit}</p>
                <button className="btn btn-primary m-3" onClick={()=>addCourse(tmpCourse)}>Save Course</button>
            </div>}
            {/* {console.log("tmpCourse after save: "+tmpCourse?.name)} */}
        </div>
    )
}

export default AddCourse
