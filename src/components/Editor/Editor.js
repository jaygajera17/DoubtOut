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
        <>
            <form onSubmit={handleSubmit} method='post'>
                <div className="container" Style="width:70%; display:block; margin:auto;">
                    <JoditEditor
                        ref={editor}
                        value={props.initialValue}
                        config={config}
                        tabIndex={1}
                        //   onBlur={(newContent) => getValue(newContent)}
                        onChange={(newContent) => getValue(newContent)}
                    />
                </div>

                <button type='submit'>Submit</button>
                <div>{html}</div>
            </form>
        </>
    )
}
