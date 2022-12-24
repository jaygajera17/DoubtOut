import Navbar from "../Navbar/Navbar";
import Editor from "../Editor/Editor";
import React from 'react'

function Homepage()
{
    return (
        <div>
            <Navbar/>
            <Editor initialValue = ""/>
        </div>
    )
}

export default Homepage