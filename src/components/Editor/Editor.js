import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";

const config = {
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

export default function Editor(props) {
    const editor = useRef(null);
    const [value, setValue] = useState("");
    const [html, setHtml] = useState("");
    const getValue = (value) => {
        setValue(value);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // const response = await fetch('http://localhost:5000/api/posts/addpost', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },

        //   body: JSON.stringify({ value: value }),
        // });

        // const json = await response.json()
        setHtml(parse(value));
        // console.log(json["desc"]);
    }

    return (

        <div Style="background-color:#f8f9f9; height:100%; margin-top:10vh; z-index:1;">


            <div className="container mb-5" Style="width:70%; display:block; margin:auto;">
                <div class="card mt-5" Style="background-color:hsl(206,100%,97%);">
                    <div class="card-header">
                        <h3><b>Ask a Public Question</b></h3>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Writing a Good Question</h5>
                        <p class="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
                        <h5>Steps</h5>
                        <ul>
                            <li>Summarize your problem in a one-line title.</li>
                            <li>Describe your problem in more detail.</li>
                            <li>Describe what you tried and what you expected to happen.</li>
                            <li>Add “tags” which help surface your question to members of the community.</li>
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSubmit} method='post'>

                    <div class="card mb-3 mt-5">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title" />
                                <small id="emailHelp" class="form-text text-muted">Enter Your title in few Words</small>
                            </div>

                        </div>
                    </div>

                    <JoditEditor
                        ref={editor}
                        value={props.initialValue}
                        config={config}
                        tabIndex={1}
                        //   onBlur={(newContent) => getValue(newContent)}
                        onChange={(newContent) => getValue(newContent)}

                    />

                    <div class="card mt-3">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Question Tags</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Tags" />
                                <small id="emailHelp" class="form-text text-muted">Enter Question Tags</small>
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="btn btn-primary mt-5">Ask Question</button>
                </form>
            </div>

            <div>{html}</div>
        </div>
    )
}
