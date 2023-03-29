import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import Chart from '../charts/Chart';
import  AdminSidebar  from '../Admin/AdminSidebar';
import axios from "axios";
import { Tag } from "@mui/icons-material";

export default function AdminHome() {
    const [user, setUser] = useState(0);
    const [question, setQuestion] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [accept, setAccept] = useState(0);
    const [questionByMonth, setquestionByMonth] = useState(null);

    const [chartInstance, setChartInstance] = useState(null);

    const noOfusers =  async () => {
        await fetch('http://localhost:5000/api/admin/noOfUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUser(data)
            }
            )
        }

    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchquestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    }, [])


    useEffect(() => {
        const freqOfTags = [];
        const tag = [];
        const cnt = [];

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = 0;
        }))

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = freqOfTags[tag] + 1;
        }))

        // console.log(freqOfTags);

        for (const i in freqOfTags) {
            tag.push(i);
            cnt.push(parseInt(freqOfTags[i]));
        }

        setTags(tag);
        setCount(cnt);

    }, [questions]);

    return (
        <div className='container' Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;">
            <AdminSidebar />
        <br/>
        </div>
    );
    }