import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import '../../Header/header.css';
import './postsAns.css';

export default function Posts({ posts }) {

    const [vote, setVotes] = useState({});

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

    const deleteAns = async(id)=>{
        const response = await fetch(`http://localhost:5000/api/answer/deleteans/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json()

        if (json["status"] === "deleted") {
            // setState(true);
            window.scrollTo(0, 0)
            window.location.reload(true);
        }
    }

    useEffect(() => {
        fetchVotes();
    }, [])

    return (
        <>
            <ul>
                {posts.map(answer => (
                    <div className="all-questions">
                        <div className="all-questions-container">
                            <div className="all-questions-left">
                                <div className="all-options">
                                    <div className="all-option">
                                        <p>{vote[answer._id]}</p>
                                        <span>votes</span>
                                    </div>
                                    {/* <div className="all-option">
                                        <p>0</p>
                                        <span>views</span>
                                    </div> */}
                                </div>
                            </div>

                            <div className="question-answer">
                                <NavLink to={{ pathname: `/question/${answer.questionid}` }} className="GotoQues"><h4>Go to Question</h4></NavLink>
                                <div style={{ width: "90%", }}>
                                    <p Style="font-size:25px;">{parse(answer.answer)}</p>
                                </div>
                                <div Style="position: absolute; right: 7%;" className='mt-5'>
                                    <NavLink className="mt-2" to={{ pathname: `/updateans/${answer._id}` }} Style="font-size:15px;"><i Style="padding:5px; color:#0074CC" className="fa fa-edit" aria-hidden="true"></i></NavLink>
                                    <NavLink onClick={()=>deleteAns(answer._id)}><i Style="padding:25px; color:#0074CC" className="fa fa-trash" aria-hidden="true"></i></NavLink>
                                </div>
                                <div className="author">
                                    <div className="author-details">
                                        <p>{answer.postedBy}</p>
                                    </div>
                                    {/* <small className='d-flex flex-row-reverse'>asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy} &nbsp;</p></small> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    )
}
