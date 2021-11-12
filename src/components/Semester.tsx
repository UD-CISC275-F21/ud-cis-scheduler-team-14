import React, { useState } from 'react'
import {IState as Props} from "../App";
import EditCourse from './EditCourse'
//import {Table} from 'react-bootstrap'

interface IProps{
    Courses:Props["Courses"]
    setCourses: React.Dispatch<React.SetStateAction<Props["Courses"]>>
    value: string
    allCourses: Props["allCourses"]
    testAddAllCourses: (newCourses: any) => void
    sortCoursesId: (courses: Props["Courses"]) => void

}

const Semester:React.FC<IProps> = ({Courses, value, setCourses, allCourses, testAddAllCourses, sortCoursesId}) => {
    const [showEditDiagram, setShowEditDiagram] = useState(false);
    const [editTmpId,setEditTmpId] = useState<number>(0);
    let totalCredit = 0;

    const deleteCourse = (name:any) => { 
           setCourses(Courses.filter((course) => course.name !== name))
        //    console.log("deleted id: "+ id)
        }

    const editCourse = (id:any) => {
        setShowEditDiagram(true);
        const tmpCourse = Courses.filter((res)=>{
        return res.id == id;
        });
        setEditTmpId(tmpCourse[0].id); //this line has a fixed number
      }
    const editAddCourse=(tmpCourse:any)=>{
        // setFallCourses(fallCourses.filter((course) => {return course.id !== tmpCourse.id}))
        // const newFallCourses = fallCourses.filter((course) => {return course.id !== tmpCourse.id})
        let curIndex = 0;
        const curCourse = JSON.parse(JSON.stringify(Courses));
        Courses.forEach((course,index) => {
            if (course.id == tmpCourse.id) curIndex = index;
        })
        curCourse[curIndex] = tmpCourse;
        setCourses(curCourse);
        setShowEditDiagram(false);
    }

    // const checkPrerequisite=(checkCourse:any)=>{
    //     let semesterIndex= 0;
    //     const curAllCourses = JSON.parse(JSON.stringify(allCourses));
    //     allCourses?.forEach((item,index)=>{
    //         if(item == Courses) semesterIndex = index;
    //     })
    //     console.log("semesterIndex"+semesterIndex)
    // }

    const cancelEditDiagram = () => {
        setShowEditDiagram(false);
    }

    const clearCourse=()=>{
        setCourses([])
    }

    const countCredit=()=>{
        Courses.forEach(item=>{
            totalCredit += item.credit
        })
    }
    
    return (
        <div>
            {value}
            {/* {testAddAllCourses(Courses)} */}
            {sortCoursesId(Courses)}


            <button className ="btn btn-primary m-2" onClick={clearCourse}>Clear</button>
            <table  className = "table table-striped"  >
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credit</th>
                    </tr>
                </thead>
                {Courses.map(course => <tr key={course.id} draggable >
                <th scope="row">{course.id}</th>
                <td draggable >{course.name}</td>
                <td draggable>{course.description}</td>
                <td >{course.credit}</td>
                <button className="btn btn-primary m-2" onClick={()=>editCourse(course.id)}>Edit</button>
                <button className="btn btn-primary m-2"  onClick={()=>deleteCourse(course.name)}>Delete</button>
                </tr> 
                )}     
                <tr>
                {countCredit()}
                total credits: {totalCredit}
                </tr>
            </table>

            {showEditDiagram? 
             <div className='outer-diagram'>
                 <div className='diagram'>
                   <EditCourse  editTmpId={editTmpId}  editAddCourse={editAddCourse}/>
                   <button className='diagram-cancel btn btn-primary' onClick={cancelEditDiagram}>cancal</button>
                 </div>
             </div> :
             <div></div>
             }

             
        
    </div>
    )
}

export default Semester

