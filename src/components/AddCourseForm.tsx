import React, { useState } from 'react'
import { Form, Toast } from 'react-bootstrap'
import { courseType } from '../interfaces/coursePool'
import CourseInfoForm from './CourseInfoForm'

interface addCourseForm{
    onAdd: (course: courseType, semester: number) => void
    semesterPool:string[]
    searchCourse: (id: string) => courseType 
    checkPrerequisite: (requiredCourseId: string, semesterIndex: number) => boolean  
    defaultOb:  courseType
    editDbCourse: (tmpCourse: courseType) => void
}

const AddCourseForm = ({onAdd, semesterPool, searchCourse, checkPrerequisite, defaultOb, editDbCourse}:addCourseForm) => {
    const [showAdd, setShowAdd] = useState(false)
    const [id,setId] = useState('')
    const [semester,setSemester] = useState("")
    const [semesterIndex, setSemesterIndex] = useState(0)
    const [tmpCourse, setTmpCourse] = useState<courseType>(defaultOb) 
    const [notSatisfiedCourses, setNotSatisfiedCourses] = useState<string[]>([])
    const [showAddFail, setshowAddFail] = useState(false)


    const onSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); 

        //find course info
        const tmpCourse =searchCourse(id);
        if(tmpCourse===undefined){ //does this line works?
            return false;
        }

        // find semester index in semesterPool
        let curIndex = 0;
        let exist = false;
        semesterPool.forEach((value,index) => {
            if (value===semester){
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

        //check prerequisite
        let tmpNotSatisfiedCourses:string[] = []; //is it right way to declare new Array 
        tmpCourse.prerequisite.forEach(pre=>{
        if(checkPrerequisite(pre,semesterIndex)===false) tmpNotSatisfiedCourses.push(pre)
        })
        setNotSatisfiedCourses(tmpNotSatisfiedCourses)
        if(notSatisfiedCourses.length){
            setshowAddFail(true)
        }  
    }

    const addCourse=(course:courseType)=>{
        //do the add 
        if(!notSatisfiedCourses.length){
         onAdd(course,semesterIndex)
        }else{
            alert("add failed, not satisfied courses exist")   
        }
         
        //set value inside this class to orgin
        setTmpCourse(defaultOb);
        setId('');
        setShowAdd(!showAdd)
        setSemester('');
        setNotSatisfiedCourses([])
        setshowAddFail(false)
    }

    return (
        <div className='form-control'>
            <Form onSubmit={onSubmit}>
                <Form.Group >                    
                    <Form.Label>Semester </Form.Label>
                    <select className="form-control"name="name" value={semester} onChange={(e)=>{
                        setSemester(e.target.value);
                        }}>
                        <option>select a semester</option>
                        {semesterPool.map((semester, index)=><option key={index}>{semester}</option>)}
                    </select>
                </Form.Group>
                <Form.Group >
                    <p><Form.Label>Course</Form.Label></p>
                    <input type='text' placeholder='Ex. CISC106' value={id} onChange={(e)=>{
                        setId(e.target.value)
                        }}
                        />
                    {<input type='submit' className='btn btn-primary m-2'value='Search Course'/>}
                      

                </Form.Group>
            </Form>
            
            {showAdd && 
            <CourseInfoForm tmpCourse={tmpCourse} showAddFail={showAddFail} notSatisfiedCourses={notSatisfiedCourses} addCourse={addCourse}
            editDbCourse= {editDbCourse} searchCourse = {searchCourse}/>
                    }
            <Toast>    {/* add in the right top corner */}
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>Course {id} add failed</Toast.Body>
            </Toast>
          
        </div>
    )
}

export default AddCourseForm
