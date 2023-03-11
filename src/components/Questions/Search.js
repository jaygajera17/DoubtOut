import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
// import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import { FilterList } from '@mui/icons-material';
import '../Header/header.css';
import Posts from './Posts';
import Pagination from './Pagination';

export default function Search() {

    const location = useLocation();
    // const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);



    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    //for pop-up of filter...
    // const [showFilter, setShowFilter] = useState(false);

    // fetch all the questions
    // const fetchAllQuestions = async () => {
    //     await fetch("http://localhost:5000/api/question/fetchquestions", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => {
    //         return response.json();
    //     }).then(data => setQuestions(data))
    // }




    // Function to sort questions by higher votes question displays first
    const sortByVotes = async () => {
        await fetch("http://localhost:5000/api/question/fetchQueByHigherVotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    // Function to filter all the questions which are answered.

    const answeredQuestions = async () => {
        await fetch("http://localhost:5000/api/question/answeredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const unansweredQuestions = async () => {
        await fetch("http://localhost:5000/api/question/unansweredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    useEffect(() => {

        if (location.state !== null) {
            setQuestions(location.state);
        }

    })
    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

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
                                        <p>{questions.length} Questions</p>
                                        <div className="main-filter">
                                            <div className="main-tabs">
                                                <div className="main-tab">
                                                    <NavLink className="tab" onClick={answeredQuestions}>Answered</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink onClick={sortByVotes}>Votes</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink onClick={unansweredQuestions}>Unanswered</NavLink>
                                                </div>
                                            </div>

                                            {/* filter functionality */}
                                            {/* <div className="main-filter-item" onClick={(e) => {
                                                e.persist();
                                                setShowFilter(!showFilter);

                                            }
                                            }> */}
                                            {/* <FilterList style={{ fontSize: '21px' }} />
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
                                            } */}
                                        </div>
                                    </div>
                                    {/* This displays all questions */}
                                    <div className="questions">
                                        <div className="question">
                                            <Posts posts={currentPosts} />
                                        </div>

                                    </div>
                                    <div className="container">

                                        <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
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
