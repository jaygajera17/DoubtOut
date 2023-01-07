import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser";
import JoditEditor from "jodit-react";

export default function Content(props) {
    const editor = useRef(null);
    const params = useParams();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState([])
    const [html, setHtml] = useState("");

    const config = {
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    };

    const fetchQuestion = async (id) => {

        await fetch(`http://localhost:5000/api/question/fetchQueById/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setQuestion(data);
            setHtml(parse(data.question));
        })

        console.log(question);


    }

    // const convertToHTML = () => {
    //     setHtml(parse(question.question));
    // }

    const getValue = (value) => {
        setValue(value);
    };

    useEffect(() => {
        fetchQuestion(params.type);
        // convertToHTML();
    }, [])

    return (
        <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
            <div className="container" Style="width:70%;display:block; margin:auto;">
                <h1>{question.title}</h1>
                <div className='mt-5'>{html}</div>
                <hr style={{
                    background: "black",
                    height: "2px",
                    border: "none",
                }}
                /><hr />

                <h4>Your Answer</h4>

                <JoditEditor
                    ref={editor}
                    config={config}
                    tabIndex={1}
                    value={value}
                    onBlur={(newContent) => getValue(newContent)}
                // onChange={(newContent) => getValue(newContent)}

                />

                <button type='submit' className="btn btn-primary mt-5 mb-3">Post Your Answer</button>
            </div>
        </div>
    )
}
