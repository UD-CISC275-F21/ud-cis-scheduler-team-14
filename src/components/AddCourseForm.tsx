import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AllUserCoursesType, courseType } from "../interfaces/coursePool";
import { checkDuplicate, checkPrerequisite, searchCourse } from "../utilities/data";
import CourseInfoForm from "./CourseInfoForm";


interface addCourseForm{
    onAdd:  (course: courseType, semesterIndex: number, AllUserCourses: AllUserCoursesType, setAllUserCourses: (value: React.SetStateAction<AllUserCoursesType>) => void) => void
    semesterPool:string[]
    defaultOb:  courseType
    AllUserCourses: AllUserCoursesType
    setAllUserCourses: (value: React.SetStateAction<AllUserCoursesType>) => void
    coursePool: courseType[]
    setCoursePool: React.Dispatch<React.SetStateAction<courseType[]>>
}

const AddCourseForm = ({onAdd, semesterPool, defaultOb,AllUserCourses,setAllUserCourses,coursePool,setCoursePool}:addCourseForm):JSX.Element => {
    const [showAdd, setShowAdd] = useState(false);
    const [id,setId] = useState("");
    const [semester,setSemester] = useState("");
    const [semesterIndex, setSemesterIndex] = useState(0);
    const [tmpCourse, setTmpCourse] = useState<courseType>(defaultOb);
    const [notSatisfiedCourses, setNotSatisfiedCourses] = useState<string[]>([]);
    const [showAddFail, setshowAddFail] = useState(false);

    const onSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        //find course info
        const tmpCourse =searchCourse(id,coursePool);
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
        });
        if (exist) {
            if(showAdd){
                setSemesterIndex(curIndex);
                setTmpCourse(tmpCourse);
            }else{
                setSemesterIndex(curIndex);
                setTmpCourse(tmpCourse);
                setShowAdd(!showAdd);
            }
        } else {
            alert("semester not found");
        }

        //check prerequisite
        const tmpNotSatisfiedCourses:string[] = []; //is it right way to declare new Array
        tmpCourse.prerequisite.forEach(pre=>{
            if(checkPrerequisite(pre,semesterIndex,AllUserCourses)===false) tmpNotSatisfiedCourses.push(pre);
        });
        setNotSatisfiedCourses(tmpNotSatisfiedCourses);
        if(notSatisfiedCourses.length){
            setshowAddFail(true);
        }
    };

    const addCourse=(course:courseType)=>{
        //do the add
        if(!notSatisfiedCourses.length){
            if(!checkDuplicate(course.id,semesterIndex,AllUserCourses)){
                onAdd(course,semesterIndex,AllUserCourses,setAllUserCourses);
            }else{
                alert("add failed. "+course.id+" is already in the semester");
            }
        }else{
            alert("add failed, not satisfied courses exist");
        }

        // set value inside this class to orgin
        setTmpCourse(defaultOb);
        setId("");
        setShowAdd(!showAdd);
        setSemester("");
        setNotSatisfiedCourses([]);
        setshowAddFail(false);
    };

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
                        setId(e.target.value);
                    }}
                    />
                    {<input type='submit' className='btn btn-primary m-2'value='Search Course'/>}


                </Form.Group>
            </Form>
            {showAdd &&
            <CourseInfoForm tmpCourse={tmpCourse} showAddFail={showAddFail} notSatisfiedCourses={notSatisfiedCourses} addCourse={addCourse}
                setShowAdd={setShowAdd} coursePool={coursePool} setCoursePool = {setCoursePool}/>
            }

        </div>
    );
};

export default AddCourseForm;
