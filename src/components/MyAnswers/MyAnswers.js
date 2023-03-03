import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';

import Posts from '../Questions/Posts';
import Pagination from '../Questions/Pagination';

import { PieChart } from 'react-minimal-pie-chart';
import Chart from '../charts/Chart';

export default function Profile() {

    const [answers, setAnswers] = useState({});

    // for pagination in profile
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

   

    // This function will find the count of No. of answer for a perticular Question
    const FindAnsOfUser = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchUserAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setAnswers(data));
    }

    useEffect(() => {
        FindAnsOfUser();
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div>

                <div className="questions">
                    <div className="question">
                        <Posts posts={currentPosts} />
                    </div>

                </div>
                <div className="container">

                    <Pagination postsPerPage={postPerPage} totalPosts={answers.length} paginate={paginate} />
                </div>

            </div>
    )
}
