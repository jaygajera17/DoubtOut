import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import { useNavigate } from 'react-router-dom';

export default function Content(props) {

    const navigate = useNavigate();
    const editor = useRef(null);
    const params = useParams();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState([])
    const [html, setHtml] = useState("");
    const [state, setState] = useState(false);
    const [answers, setAnswer] = useState([]);
    const [vote, setVotes] = useState({});
    const [voteStatus, setVoteStatus] = useState({});
    const [loginstatus, setloginstatus] = useState(false);

    const config = {
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    };

    const isLoggedIn = () => {
        if (localStorage.getItem('username') !== null) {
            setloginstatus(true);
        }
    }
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




    }

    const fetchAnswers = async (id) => {
        await fetch(`http://localhost:5000/api/answer/fetchanswer/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setAnswer(data);
        })
    }

    const getValue = (value) => {
        setValue(value);
    };


    const handleSubmit = async (e, id) => {

        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/answer/addanswer/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ answer: value, postedId: '63ae78ac00418318bfbfc2a8', postedBy: 'JayGajera', votes: 0 }),
        });

        const json = await response.json()


        if (json["status"] === true) {
            setState(true);
            window.scrollTo(0, 0)
        }


    }

    const upvote = async (e, id) => {

        if (localStorage.getItem("username") !== null) {


            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/answer/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();

            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }

    }

    const downvote = async (e, id) => {

        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/answer/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();

            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }

    }

    const fetchVotes = async () => {

        const response = await fetch(`http://localhost:5000/api/answer/fetchVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();

        setVotes(json);



    }

    useEffect(() => {
        isLoggedIn();
        fetchQuestion(params.type);
        fetchAnswers(params.type);
        fetchVotes();
        // convertToHTML();
    }, [state, voteStatus])

    return (
        <div Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            {(
                () => {
                    if (state === true) {

                        return (<>
                            <div class="alert alert-success alert-dismissible" role="alert">
                                Your Answer is Posted <strong>Successfully</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </>)

                    }
                }
            )()}
            <div className="container" Style="height:100vh;width:70%;display:block; margin:auto;">

                <h1>{question.title}</h1>
                <div className='mt-5'>{html}</div>
                <hr style={{
                    background: "black",
                    height: "2px",
                    border: "none",
                }}
                /><hr />

                <h4>{answers.length}  Answers</h4>
                {answers.length > 0 && (
                    <div className='mt-5'>
                        {answers.map(ans => (
                            <div className="">

                                <div className="d-flex flex-row">
                                    <div class="d-flex flex-column col-md-0 mt-0 mx-0">
                                        <button className='btn btn-white' onClick={(e) => upvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-up" Style="font-size: 35px;"></i></button>
                                        <div className='mx-3'>{vote[ans._id]}</div>
                                        <button className='btn btn-white' onClick={(e) => downvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-down" Style="font-size: 35px;"></i></button>
                                        {(
                                            () => {
                                                if (ans.status === "Accepted") {
                                                    return (<><button className='btn btn-white'><i class="fa fa-check" Style="font-size:25px;color:lightgreen;"></i></button></>)
                                                }
                                            }
                                        )()}
                                    </div>
                                    <div class="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                                        <p>{parse(ans.answer)}</p>


                                        <small className='d-flex flex-row-reverse'>Posted By : {ans.postedBy}</small>
                                    </div>
                                </div>

                                {/* <p class="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p> */}

                                <hr style={{
                                    background: "#959595",
                                    height: "2px",
                                    border: "none",
                                }}
                                /><hr />

                            </div>
                        ))}
                    </div>
                )}

                <h4>Your Answer</h4>
                <form onSubmit={(e) => handleSubmit(e, question._id)} method='POST'>
                    <JoditEditor
                        ref={editor}
                        config={config}
                        tabIndex={1}
                        value={value}
                        onBlur={(newContent) => getValue(newContent)}
                    // onChange={(newContent) => getValue(newContent)}

                    />

                    {
                        loginstatus === true ? (<button type='submit' className="btn btn-primary mt-5 mb-3">Post Your Answer</button>) : <></>
                    }

                </form>
            </div>
        </div>
    )
}
