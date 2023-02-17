import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import { FilterList } from '@mui/icons-material';
import '../Header/header.css';

export default function Questions() {

    const navigate = useNavigate();
    const [questions, setQuestions] = useState([])
    const [noOfAns, setnoOfAns] = useState({});

    //for pop-up of filter...
    const [showFilter, setShowFilter] = useState(false);

    const fetchAllQuestions = async () => {
        await fetch("http://localhost:5000/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

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

    const askQue = () => {

        if (localStorage.getItem("username") !== null) {
            navigate("/editor");
        }
        else {
            navigate("/login");
        }


    }
    useEffect(() => {
        fetchAllQuestions();
        FindFrequencyOfAns();

    }, [])

    return (
        <>


            <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
                <div class="">


                    <div className="stack-index">
                        <div className="stack-index-content" >
                            <Sidebar />


                            <div className="main">
                                <div className="main-container">
                                    <div className="main-top">
                                        <h2>All Questions</h2>
                                        <NavLink to="/editor"><button>Ask Question</button></NavLink>
                                    </div>

                                    <div className='main-desc'>
                                        <p>All question stat</p>
                                        <div className="main-filter">
                                            <div className="main-tabs">
                                                <div className="main-tab">
                                                    <NavLink className="tab">Newest</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink>Active</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink Style="color: rgb(125, 119, 119);">More</NavLink>
                                                </div>
                                            </div>

                                            {/* filter functionality */}
                                            <div className="main-filter-item" onClick={() => 
                                                setShowFilter(!showFilter)
                                            }>
                                                <FilterList style={{ fontSize: '21px' }} />
                                                <p className="filter-text">Filter</p>
                                            </div>
                                            
                                            {
                                                showFilter && (
                                                    <div className="filter_main">
                                                        <div className="card3">
                                                            <p>tag</p>
                                                            <p>answered</p>
                                                            <p>unanswered</p>
                                                            <p>4</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="questions">
                                        <div className="question">
                                            {questions.length > 0 && (
                                                <ul>
                                                    {questions.map(question => (
                                                        <div className="all-questions">
                                                            <div className="all-questions-container">
                                                                <div className="all-questions-left">
                                                                    <div className="all-options">
                                                                        <div className="all-option">
                                                                            <p>0</p>
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
                                                                            <small>0 views</small>
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
                                                                    <div className='mt-3'>{question.tags.split(" ").map(tag => <span className='question-tags' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</span>)}</div>
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
                                            )}

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* 
                    <div class="d-flex flex-column flex-shrink-0 p-3 col-md-7" Style="background-color:white;">
                        <div className="d-flex d-flex-row align-items-center">
                            <h1 className='mx-4'>see here All Questions</h1>

                            <button className="btn btn-primary mx-4" Style="position:absolute; right:0px;" onClick={askQue}>See Here Ask Question</button>
                        </div>


                        {questions.length > 0 && (
                            <ul>

                                {questions.map(question => (

                                    <div class="card mt-1">

                                        <div class="card-body">
                                            <div className="d-flex flex-row">

                                                <div class="d-flex flex-column flex-shrink-0 col-md-2 mt-4 mx-0">

                                                    <div>0 votes</div>
                                                    {(
                                                        () => {
                                                            if (question._id in noOfAns) {
                                                                return (<div>{noOfAns[question._id]} Answers</div>);
                                                            }
                                                            else {
                                                                return (<>0 Answers</>);
                                                            }
                                                        }
                                                    )()}



                                                </div>

                                                <div class="d-flex flex-column flex-shrink-0 col-md-10">
                                                    <NavLink to={{ pathname: `/question/${question._id}` }} className="card-title" Style="text-decoration:none;color:#0074CC"><h4>{question.title}</h4></NavLink>
                                                    <small Style="font-size:1px;">{parse(question.question)[0]}</small>
                                                 
                                                    <div className='mt-3'>{question.tags.split(" ").map(tag => <small className='mx-2 px-2 py-1' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</small>)}</div>
                                                    <small className='d-flex flex-row-reverse'> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy}&nbsp;</p></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                        )}



                    </div> */}
                </div>


            </div>
        </>

    )
}
