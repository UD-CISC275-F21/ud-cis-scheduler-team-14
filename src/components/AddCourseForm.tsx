import React, { useState } from 'react'
import CourseInfoForm from './CourseInfoForm'

interface addCourseForm{
    onAdd: (course: any, semester: any) => void
    semesterPool:string[]
    searchCourse: (id: string) => {
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: string[];
        required: boolean;
        elective: boolean;
    }  
    checkPrerequisite: (requiredCourseId: string, semesterIndex: number) => boolean  
    defaultOb:  {
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: never[];
        required: boolean;
        elective: boolean;
    }
}

const AddCourseForm = ({onAdd, semesterPool, searchCourse, checkPrerequisite, defaultOb}:addCourseForm) => {
    const [showAdd, setShowAdd] = useState(false)
    const [id,setId] = useState('')
    const [semester,setSemester] = useState("")
    const [semesterIndex, setSemesterIndex] = useState(0)
    const [tmpCourse, setTmpCourse] = useState<{
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: string[];
        required: boolean;
        elective: boolean;
    }    >(defaultOb) 
    const [notSatisfiedCourses, setNotSatisfiedCourses] = useState<string[]>([])
    const [showAddFail, setshowAddFail] = useState(false)


    const onSubmit =(e:any)=>{
        e.preventDefault(); 
        //find course info
        const tmpCourse =searchCourse(id);
        if(tmpCourse==undefined){
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
        let tmpNotSatisfiedCourses:string[] = new Array();
        tmpCourse.prerequisite.map(pre=>{
        if(checkPrerequisite(pre,semesterIndex)===false) tmpNotSatisfiedCourses.push(pre)
        })
        setNotSatisfiedCourses(tmpNotSatisfiedCourses)
        if(notSatisfiedCourses.length!==0){
            setshowAddFail(true)
        }  
    }

    const addCourse=(course:any)=>{
        //do the add 
         onAdd(course,semesterIndex);
         
        //set value inside this class to orgin
        setTmpCourse(defaultOb);
        setId('');
        setShowAdd(!showAdd)
        setId('')
        setSemester('');
        setNotSatisfiedCourses([])
        setshowAddFail(false)
    }

    return (
        <div>
            <form className='add-form'onSubmit={onSubmit}>
                <div className='form-control'>                    
                    <label>Semester </label>
                    <select className="form-control"name="name" value={semester} onChange={(e)=>{
                        setSemester(e.target.value);
                        }}>
                        <option>select a semester</option>
                        {semesterPool.map(semester=><option>{semester}</option>)}
                    </select>
                </div>
                <div className='form-control'>
                    <label>Course </label>
                    <input type='text' placeholder='Add Course. Ex. CISC106' value={id} onChange={
                        (e)=>{
                            setId(e.target.value)
                        }}
                        />
                        {<input type='submit' className='btn btn-primary m-2'value='Search Course'/>}
                </div>
            </form>

            {showAdd && <CourseInfoForm tmpCourse={tmpCourse} showAddFail={showAddFail} notSatisfiedCourses={notSatisfiedCourses} addCourse={addCourse}/>
                    }
            
        </div>
    )
}

export default AddCourseForm
