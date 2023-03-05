import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import { Avatar } from '@mui/material';
import './profile.css';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';

import Posts from '../Questions/Posts';
import Pagination from '../Questions/Pagination';

import { PieChart } from 'react-minimal-pie-chart';
import Chart from '../charts/Chart';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

export default function Profile() {

    const [questions, setQuestions] = useState([]);
    const [noOfAns, setnoOfAns] = useState({});
    const [points, setPoints] = useState(0);

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

    const Points = async () => {
        const response = await fetch("http://localhost:5000/api/answer/points", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();
        setPoints(json["points"]);
    }

    useEffect(() => {
        fetchAllQuestions();
        FindFrequencyOfAns();
        Points();
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className='container' Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            
            <ProfileSidebar/>

            <ProfileHeader/>

{/* 
                <div className="questions">
                    <div className="question">
                        <Posts posts={currentPosts} />
                    </div>

                </div>
                <div className="container">

                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                </div> */}



        </div>
    )
}
