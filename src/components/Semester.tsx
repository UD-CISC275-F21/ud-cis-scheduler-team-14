import React, { useState } from 'react'
import {IState as Props} from "../App";
// import { Tabs, Tab } from "react-bootstrap";

interface IProps{
    Courses:Props["Courses"]
    value:Props["value"]
    onDelete: (id: any,semester:any) => void
    setCourses: React.Dispatch<React.SetStateAction<Props["Courses"]>>
    editCourse: (id:any) => void;
}

const Semester:React.FC<IProps> = ({Courses, value, setCourses, editCourse}) => {
    const [totalCredit, setTotalCredit] = useState<number>(0);

    const deleteCourse = (id:any) => { 
           setCourses(Courses.filter((course) => course.id !== id))
         }
    // const addCredit = (credit:any) =>{
    //     setTotalCredit(credit+totalCredit)
    // }

    return (
        <div>
            {value}
            <button className ="btn btn-primary m-2" onClick={()=>setCourses([])}>Clear</button>
            <table className = "table table-striped"  >
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credit</th>
                    </tr>
                </thead>
                {Courses.map(course => <tr key={course.id} >
                <th scope="row">{course.id}</th>
                <td>{course.course}</td>
                <td>{course.description}</td>
                <td>{course.credit}</td>
                <button className="btn btn-primary m-2" onClick={()=>editCourse(course.id)}>Edit</button>
                <button className="btn btn-primary m-2"  onClick={()=>deleteCourse(course.id)}>Delete</button>
                </tr> 
                )}     
                <tr>
                {/* {Courses.forEach((course)=>{course.credit})} */}
                total credits: {totalCredit}
                </tr>
            </table>

            {/* {prompt("asd")} */}
        
    </div>
    )
}

export default Semester


{/* <Tabs
id="controlled-tab-example"
activeKey={key}
 onSelect={(k:any) => setKey(k)} 
className="mb-3"
>
<Tab eventKey="home" title="Home">
    abc
</Tab>
<Tab eventKey="profile" title="Profile">
    efg
</Tab>
<Tab eventKey="contact" title="Contact" disabled>
    xyz
</Tab>
</Tabs> */}