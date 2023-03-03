import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Profile from '../Profile/Profile';

import Posts from '../Questions/Posts';
import Pagination from '../Questions/Pagination';

export default function MyQuestions() {

    const [questions, setQuestions] = useState([]);

    // for pagination in profile
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    const fetchAllQuestions = async () => {
        await fetch(`http://localhost:5000/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    }

    useEffect(() => {
        fetchAllQuestions();
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div>
                <Profile/>

                <div className="questions">
                    <div className="question">
                        <Posts posts={currentPosts} />
                    </div>

                </div>
                <div className="container">

                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                </div>

            </div>
    )
}
