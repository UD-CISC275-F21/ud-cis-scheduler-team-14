import { useState } from 'react'
// import {semesterCourses} from '../interfaces/coursePool'
import {Table, CloseButton } from 'react-bootstrap'
import EditCourseForm from './EditCourseForm'
import { useDrop} from 'react-dnd'
import { FaEdit, FaTrash } from "react-icons/fa";
import { AllUserCoursesType, courseType, semesterCoursesType } from '../interfaces/coursePool';

interface semesterBoard{
    semester:{
        semesterName: string;
        semesterCourses: semesterCoursesType;
    }
    setAllUserCourses: React.Dispatch<React.SetStateAction<AllUserCoursesType>>
    semesterIndex: number
    AllUserCourses: AllUserCoursesType
    searchCourse: (id: string) => courseType
    semesterPool: string[]
    setSemesterPool: React.Dispatch<React.SetStateAction<string[]>>
    checkPrerequisite: (requiredCourseId: string, semesterIndex: number) => boolean
    checkDuplicate: (courseId: string, semesterIndex: number) => boolean
}

const SemesterBoard = ({semester,AllUserCourses,setAllUserCourses,semesterIndex, searchCourse, semesterPool, setSemesterPool,checkPrerequisite,checkDuplicate}:semesterBoard):JSX.Element => {
    const [showEditDiagram, setShowEditDiagram] = useState(false);
    const [editTmpId,setEditTmpId] = useState<string>("not found");

    const deleteSemester=()=>{
        let tmpAllUserCourses = AllUserCourses //remove item in AllUserCourses
        tmpAllUserCourses= [...AllUserCourses.filter(item=>item!==semester)]
        setAllUserCourses(tmpAllUserCourses)
        let tmpSemesterPool = semesterPool //remove item in  semesterPool
        tmpSemesterPool = [...semesterPool.filter(semester=>semester!==semesterPool[semesterIndex])]
        setSemesterPool(tmpSemesterPool)
    }

    const clearCourses = ()=>{
        let tmpAllUserCourses = AllUserCourses
        tmpAllUserCourses[semesterIndex].semesterCourses = []
        setAllUserCourses(tmpAllUserCourses)
    }

    const deleteCourse = (id:string) => {
        let tmpAllUserCourses = AllUserCourses
        tmpAllUserCourses[semesterIndex].semesterCourses = [...AllUserCourses[semesterIndex].semesterCourses.filter(course=>course.id!==id)]
        setAllUserCourses(tmpAllUserCourses);
    }

    const editCourseForm=(tmpCourse:courseType)=>{
        let curIndex = 0;
        const curCourses = JSON.parse(JSON.stringify(semester.semesterCourses));
        semester.semesterCourses.forEach((course,index) => {
            if (course.id === tmpCourse.id) curIndex = index;
        })
        curCourses[curIndex] = tmpCourse;
        let tmpAllUserCourses = AllUserCourses;
        tmpAllUserCourses[semesterIndex].semesterCourses = curCourses
        setAllUserCourses(tmpAllUserCourses)
        setShowEditDiagram(false);
    }

    const showEditForm=(id:string)=>{
        console.log("check")
        setShowEditDiagram(true)
        setEditTmpId(id)
    }

    const countCredit=()=>{
        let totalCredit:number = 0
        semester.semesterCourses.map(course=>
            totalCredit += course.credit)
        return totalCredit
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "string",
        drop: (item:courseType) => dropCourse(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
      const dropCourse = (id:string) => {
        let tmpNotSatisfiedCourses:string[] = [];
        let tmpCourse = searchCourse(id)
        tmpCourse.prerequisite.forEach(pre=>{
            if(checkPrerequisite(pre,semesterIndex)===false) tmpNotSatisfiedCourses.push(pre)
        })
       if(tmpNotSatisfiedCourses.length===0){
           if(checkDuplicate(id,semesterIndex)){
          let tmpNewCourse = searchCourse(id);
          let tmpAllUserCourses = AllUserCourses;
          tmpAllUserCourses[semesterIndex].semesterCourses = [...tmpAllUserCourses[semesterIndex].semesterCourses,tmpNewCourse]
          setAllUserCourses(tmpAllUserCourses)
          alert("add success")
           }else{
            alert("add failed. "+id+" is already in the semester")
           }
        } else{
            // console.log("dropCourse function tmpNotSatisfiedCourses: "+tmpNotSatisfiedCourses.map(item=>item))
            alert("add failed, not satisfied courses existed ")
        }

      };

    return (
        <div>
            <h3>
                {semester.semesterName}
                <CloseButton  onClick={()=>deleteSemester()}/>
            </h3>
            <Table striped bordered hover size="sm" responsive>
                <thead className="thead-dark" >
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Credit</th>
                        </tr>
                    </thead>
                <tbody>
                    {semester.semesterCourses.map((course,index)=> { return (
                <tr ref = {drop} key={index}>
                    <th scope="row">{course.id}</th>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.credit}</td>
                    <div>
                        <FaEdit  fontSize="30px" onClick={()=>showEditForm(course.id)}>Edit</FaEdit>
                        <FaTrash fontSize="25px" onClick={()=>deleteCourse(course.id)}>Delete</FaTrash>
                    </div>
                    {isOver}
                </tr> )}
                 )}
                </tbody>
                Total Credits: {countCredit()}
                <button className='btn btn-danger m-2' onClick={()=>clearCourses()}>Clear Courses</button>

            </Table>
            {showEditDiagram?
             <div className='outer-diagram'>
                 <div className='diagram'>
                   <EditCourseForm  editTmpId={editTmpId}  editCourseForm={editCourseForm} setShowEditDiagram={setShowEditDiagram} searchCourse={searchCourse}/>
                 </div>
             </div> :
             <div></div>
             }
        </div>
    )
}
export default SemesterBoard
