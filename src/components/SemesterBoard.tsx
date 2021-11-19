import { useState } from 'react'
// import {semesterCourses} from '../interfaces/coursePool'
import {Button,Table, Form, Col } from 'react-bootstrap'
import EditCourseForm from './EditCourseForm'
import {useDrop} from 'react-dnd'

interface semesterBoard{
    semester:{
        semesterName: string;
        semesterCourses: {
            id: string;
            name: string;
            description: string;
            credit: number;
            prerequisite: string[];
            required: boolean;
            elective: boolean;
        }[];
         //why I cannot use interface type
    }
    setAllUserCourses: React.Dispatch<React.SetStateAction<{
        semesterName: string;
        semesterCourses: {
            id: string;
            name: string;
            description: string;
            credit: number;
            prerequisite: string[];
            required: boolean;
            elective: boolean;
        }[];
    }[]>>
    semesterIndex: number
    AllUserCourses: {
        semesterName: string;
        semesterCourses: {
            id: string;
            name: string;
            description: string;
            credit: number;
            prerequisite: string[];
            required: boolean;
            elective: boolean;
        }[];
    }[]
    searchCourse: (id: string) => {
        id: string;
        name: string;
        description: string;
        credit: number;
        prerequisite: string[];
        required: boolean;
        elective: boolean;
    }
    semesterPool: string[]
    setSemesterPool: React.Dispatch<React.SetStateAction<string[]>>
    checkPrerequisite: (requiredCourseId: string, semesterIndex: number) => boolean
}

const SemesterBoard = ({semester,AllUserCourses,setAllUserCourses,semesterIndex, searchCourse, semesterPool, setSemesterPool,checkPrerequisite}:semesterBoard):JSX.Element => {
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

    const editCourseForm=(tmpCourse:any)=>{
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
        drop: (item:any) => dropCourse(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
    
      const dropCourse = (id:string) => {
        let tmpNotSatisfiedCourses:string[] = [];
        let tmpCourse = searchCourse(id)
        tmpCourse.prerequisite.map(pre=>{
            if(checkPrerequisite(pre,semesterIndex)===false) tmpNotSatisfiedCourses.push(pre)
        })
       if(tmpNotSatisfiedCourses.length===0){
          let tmpNewCourse = searchCourse(id);
          let tmpAllUserCourses = AllUserCourses;
          tmpAllUserCourses[semesterIndex].semesterCourses = [...tmpAllUserCourses[semesterIndex].semesterCourses,tmpNewCourse]
          setAllUserCourses(tmpAllUserCourses)
          alert("add success")
        } else{
            // console.log("dropCourse function tmpNotSatisfiedCourses: "+tmpNotSatisfiedCourses.map(item=>item))
            alert("add failed, code more, add course info prompt ")
        }
      };

    return (
        <Col>
            <h1>{semester.semesterName}
                <button className='btn btn-warning m-2' onClick={()=>deleteSemester()}>X</button>
                <button className='btn btn-primary m-2' onClick={()=>clearCourses()}>clear courses</button>
            </h1>
            <Table striped bordered hover ref = {drop}>
                <thead className="thead-dark" >
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Credit</th> 
                        </tr>
                    </thead>
                {semester.semesterCourses.map(course=> 
                    <tr >
                        <th scope="row">{course.id}</th>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>{course.credit}</td>
                        <Button className="btn btn-primary m-2" onClick={()=>showEditForm(course.id)}>Edit</Button>
                        <Button className="btn btn-primary m-2"  onClick={()=>deleteCourse(course.id)}>Delete</Button>
                    </tr>
                    )}
                <tr>
                total credits: {countCredit()}
                </tr>
            </Table>   
            {showEditDiagram? 
             <div className='outer-diagram'>
                 <div className='diagram'>
                   <EditCourseForm  editTmpId={editTmpId}  editCourseForm={editCourseForm} />
                   <button className='diagram-cancel btn btn-primary' onClick={()=>setShowEditDiagram(false)}>cancel</button>
                 </div>
             </div> :
             <div></div>
             }
        </Col>
        
    )

}
export default SemesterBoard
