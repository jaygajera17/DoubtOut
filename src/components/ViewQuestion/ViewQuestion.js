import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import MainQuestion from "./MainQuestion";

function ViewQuestion() {
    return (
        <div className="stack-index">
            <div className="stack-index-content" >
                <Sidebar/> 
                <MainQuestion />
            </div>
        </div>
    );
}

export default ViewQuestion;