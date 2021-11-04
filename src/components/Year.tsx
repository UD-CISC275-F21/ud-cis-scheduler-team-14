import React, { useState } from 'react'
import {IState as Props} from '../App'
import Semester from './Semester'

interface IProps{
    yearName:string

    fallValue:string
    fallCourses: Props["Courses"]
    setfallCourses: React.Dispatch<React.SetStateAction<{
        id:number
        name:string
        description?:string
        credit:number
        prerequisite:Array<string> 
        required:boolean
        elective:boolean
    }[]>>

    springValue:string
    springCourses: Props["Courses"]
    setSpringCourses: React.Dispatch<React.SetStateAction<{
        id:number
        name:string
        description?:string
        credit:number
        prerequisite:Array<string> //
        required:boolean
        elective:boolean
    }[]>>
    allCourses:Props["allCourses"]

    setAllCourses: React.Dispatch<React.SetStateAction<any[]>>
    testAddAllCourses: (newCourses: any) => void
}

const Year:React.FC<IProps> = (
    { yearName,fallValue,fallCourses,setfallCourses
        ,springValue,springCourses,setSpringCourses,allCourses,testAddAllCourses }) => {

    const [showFirstSemester,setShowFirstSemester] = useState<Boolean>(true);
    const [showSecondSemester, setShowSecondSemester] = useState<Boolean>(true);

    return (
        <div >
            {yearName}
            <button className="btn btn-primary m-2" onClick={()=>setShowFirstSemester(!showFirstSemester)}>first Semester</button>
            <button className="btn btn-primary m-2" onClick={()=>setShowSecondSemester(!showSecondSemester)}>second Semester</button>

            {showFirstSemester && 
            <Semester value ={fallValue} Courses = {fallCourses} setCourses= {setfallCourses} 
                allCourses={allCourses}   testAddAllCourses={testAddAllCourses}/>}

            {showSecondSemester && 
            <Semester value={springValue} Courses = {springCourses} setCourses={setSpringCourses} 
            allCourses={allCourses}  testAddAllCourses={testAddAllCourses}/>}
    </div>
    )
}

export default Year

