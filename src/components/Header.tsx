import React from "react";
export interface Headers{
    save: ()=>void
    exportAsExcelFile: () => void
    setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({save, exportAsExcelFile,setShowTutorial}: Headers):JSX.Element => {
    return (
        <nav>
            <header className="navbar navbar-light bg-light">
                <h3>CS Major Four Year Plan</h3>
                {/* - High Performance Computing Concentration */}
                <button className="btn btn-primary" onClick = {save}>Save to Local</button>

                <button className = "btn btn-primary" onClick = {exportAsExcelFile}>export as XLSX</button>
                <button className = "btn btn-primary" onClick = {()=>setShowTutorial(true)}>Tutorials</button>

            </header>
        </nav>
    );
};

export default Header;
