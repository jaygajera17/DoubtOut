import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bookmark } from "@mui/icons-material";
import { History } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import JoditEditor from "jodit-react";
import './MainQuestion.css'

const config = {
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};


function MainQuestion() {

    const [show, setShow] = useState(false);


    return (
        <div className="main" id="main2">
            <div className="main-container">
                <div className="main-top">
                    <h2 className="main-question">This is question title.</h2>
                    <NavLink to="/editor"><button>Ask Question</button></NavLink>
                </div>
                <div className="main-desc">
                    <div className="info">
                        <p>Timestamp</p>
                        <p>Active<span>today</span></p>
                        <p>Viewd<span>10 times</span></p>
                    </div>
                </div>
                <div className="question">
                    <div className="question-container">
                        <div className="question-left">
                            <div className="all-options">
                                <p className="arrow"><i className="fa fa-caret-up" Style="font-size: 35px;"></i></p>
                                <p className="arrow">0</p>
                                <p className="arrow"><i className="fa fa-caret-down" Style="font-size: 35px;"></i></p>
                                <Bookmark></Bookmark>
                                <History></History>
                            </div>
                        </div>
                        <div className="question-body">
                            <p>This is a question...</p>
                            <div className="author">
                                <small>asked "Timestamp"</small>
                                <div className="auth-details">
                                    <Avatar></Avatar>
                                    <p>author name</p>
                                </div>
                            </div>
                            <div className="comments">
                                <div className="comment">
                                    <p>This is comment..
                                        <span>username</span>
                                        <small>Timestamp</small>
                                    </p>
                                </div>
                                <p onClick={() => setShow(!show)}>Add a comment</p>
                                {
                                    show && (
                                        <div className="title">
                                            <textarea type="text" placeholder="Add Your comment.." rows={5}></textarea>
                                            <button>Add comment</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="all-answer">
                    <p>No of Answers</p>
                    <div className="all-answer-container">
                        <div className="question-left">
                            <div className="all-options">
                                <p className="arrow"><i className="fa fa-caret-up" Style="font-size: 35px;"></i></p>
                                <p className="arrow">0</p>
                                <p className="arrow"><i className="fa fa-caret-down" Style="font-size: 35px;"></i></p>
                                <Bookmark></Bookmark>
                                <History></History>
                            </div>
                        </div>
                        <div className="question-body">
                            <p>This is a question...</p>
                            <div className="author">
                                <small>asked "Timestamp"</small>
                                <div className="auth-details">
                                    <Avatar></Avatar>
                                    <p>author name</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="main-answer">
                <h3>Your Answer</h3>
                <JoditEditor 
                        // ref={editor}
                        // value={props.initialValue}
                        config={config}
                        tabIndex={1}
                        //   onBlur={(newContent) => getValue(newContent)}
                        // onChange={(newContent) => getValue(newContent)}
                />
            </div>
            <button style={{maxWidth:"fit-content"}}>Post Your Answer</button>
        </div>
    );
}

export default MainQuestion;

