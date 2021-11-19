import React from 'react'
export interface Headers{
    save: ()=>void
    exportAsExcelFile: () => void
}

const Header = ({save, exportAsExcelFile}: Headers) => {
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
    
export default Header
