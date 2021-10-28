import React from 'react'
import {IState as Props} from '../App'

interface IProps{
    showSemester:Props["showSemester"]
    setShowSemester: React.Dispatch<React.SetStateAction<Props["showSemester"]>>
    onSecondShow: () => void;
    value:string
}

const Year:React.FC<IProps> = ({showSemester, setShowSemester, onSecondShow, value}) => {
    return (
        <div >
            {value}
            <button className="btn btn-primary m-2" onClick={() => setShowSemester(!showSemester)}>first Semester</button>
            <button className="btn btn-primary m-2" onClick={onSecondShow}>second Semester</button>
    </div>
    )
}

export default Year

