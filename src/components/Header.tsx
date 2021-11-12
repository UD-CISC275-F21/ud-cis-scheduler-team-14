import React from 'react'
interface IProps{
    save :()=> void
    exportAsExcelFile: () => void
}

const Headers:React.FC<IProps> = ({save, exportAsExcelFile}) => {

    return (
        <nav>
            <header className="navbar navbar-light bg-light">CS Major Four Year Plan 
            {/* - High Performance Computing Concentration */}
            <button className="btn btn-primary" onClick = {save}>Save to Local</button>

      <button className = "btn btn-primary" onClick = {exportAsExcelFile}>export as XLSX</button>
            </header>
        </nav>
    )
}

export default Headers
