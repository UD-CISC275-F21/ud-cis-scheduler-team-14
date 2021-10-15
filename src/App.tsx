import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                <p>
                    Team 14!!!!!
                    <br></br>
                    Guoyu Li; Hanfei Liang
                </p>
            </header>
        </div>
    );
}

export default App;
