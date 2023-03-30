import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
// import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
// import { FilterList } from '@mui/icons-material';
import '../Header/header.css';


export default function Posts({ posts }) {

  
    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes]  = useState({});

     // This function will find the count of No. of answer for a perticular Question
     const FindFrequencyOfAns = async () => {
        const response = await fetch("http://localhost:5000/api/answer/findNumberOfAns", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        setnoOfAns(json);

    }

    const fetchVotes = async()=>{

        const response = await fetch(`http://localhost:5000/api/question/fetchallVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();
        setVotes(json);

    }

    useEffect(() => {
        // fetchAllQuestions();
        FindFrequencyOfAns();
        fetchVotes();

    }, [])

    return (
        <>
            <ul>
                {posts.map(question => (
                    <div className="all-questions">
                        <div className="all-questions-container">
                            <div className="all-questions-left">
                                <div className="all-options">
                                    <div className="all-option">
                                        <p>{vote[question._id]}</p>
                                        <span>votes</span>
                                    </div>
                                    <div className="all-option">

                                        {(
                                            () => {
                                                if (question._id in noOfAns) {
                                                    return (<p>{noOfAns[question._id]}</p>);
                                                }
                                                else {
                                                    return (<>0</>);
                                                }
                                            }
                                        )()}
                                        <span>Answers</span>
                                    </div>
                                    <div className="all-option">
                                        {/* <small>0 views</small> */}
                                    </div>
                                </div>
                            </div>

                            <div className="question-answer">
                                <NavLink to={{ pathname: `/question/${question._id}` }} className="card-title" Style="text-decoration:none;color:#0074CC"><h4>{question.title}</h4></NavLink>
                                <div style={{ width: "90%", }}>
                                    <small Style="font-size:1px;">{parse(question.question)[0]}</small>
                                </div>
                                {/* <div style={{ display: "flex" }}>
                                                                        <span className="question-tags">react</span>
                                                                        <span className="question-tags">frontend</span>
                                                                        <span className="question-tags">development</span>
                                                                    </div> */}
                                <div className='mt-3'>{question.tags.split(" ").map(tag => <NavLink to={{ pathname: `/questionOntags/${tag.toLowerCase()}` }} className='question-tags' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</NavLink>)}</div>
                                <div className="author">
                                    {/* <small> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} </small>
                                                                        <div className="author-details">
                                                                          
                                                                            <p>{question.postedBy}</p>
                                                                        </div> */}
                                    <small className='d-flex flex-row-reverse'>asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy} &nbsp;</p></small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    )
}
