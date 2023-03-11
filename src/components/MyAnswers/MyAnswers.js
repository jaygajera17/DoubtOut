import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import PostsAns from './PostsAns';
import Pagination from '../Questions/Pagination';
import './myanswer.css';

export default function Profile() {

    const [answers, setAnswers] = useState([]);

    // for pagination in Answers in profile section.
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    // This function will find the No. of answers given by a User
    const FindAnsOfUser = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchUserAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
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
        <div className="container" Style="height:100vh;margin-top:13vh; z-index:1; background-color:white">
            <ProfileSidebar />
            <div className='header_and_content'>
                <ProfileHeader />

                <div className="questions">
                    <div className="question">
                        <PostsAns posts={currentPosts} />
                    </div>

                </div>
                <div className="container">

                    <Pagination postsPerPage={postPerPage} totalPosts={answers.length} paginate={paginate} />
                </div>

            </div>
        </div>
    )
}
