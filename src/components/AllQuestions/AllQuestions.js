import React from "react";
import { Link } from "react-router-dom";
import './AllQuestions.css';

function AllQuestions()
{
    return (
        <div className="all-questions">
            <div className="all-questions-container">
                <div className="all-questions-left">
                    <div className="all-options">
                        <div className="all-option">
                            <p>0</p>
                            <span>votes</span>
                        </div>
                        <div className="all-option">
                            <p>0</p>
                            <span>Answers</span>
                        </div>
                        <div className="all-option">
                            <small>0 views</small>
                        </div>
                    </div>
                </div>

                <div className="question-answer">
                    <Link to = '/viewQuestion'>question title.</Link>
                    <div style = {{width:"90%",}}>
                        <div>This is an answer of the question.</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <span className="question-tags">react</span>
                        <span className="question-tags">frontend</span>
                        <span className="question-tags">development</span>
                    </div>
                    <div className="author">
                        <small>Timestamp</small>
                        <div className="author-details">
                            {/* <Avatar/> */}
                            <p>user name</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllQuestions;