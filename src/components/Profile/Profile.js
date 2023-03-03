import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import { Avatar } from '@mui/material';
import './profile.css';

// import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { PieChart } from 'react-minimal-pie-chart';


export default function Profile() {

    const [questions, setQuestions] = useState([]);
    const [noOfAns, setnoOfAns] = useState({});
    const [points, setPoints] = useState(0);

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

    // const options = {
    //     exportEnabled: true,
    //     animationEnabled: true,
    //     title: {
    //         text: "Website Traffic Sources"
    //     },
    //     data: [{
    //         type: "pie",
    //         startAngle: 75,
    //         toolTipContent: "<b>{label}</b>: {y}%",
    //         showInLegend: "true",
    //         legendText: "{label}",
    //         indexLabelFontSize: 16,
    //         indexLabel: "{label} - {y}%",
    //         dataPoints: [
    //             { y: 18, label: "Direct" },
    //             { y: 49, label: "Organic Search" },
    //             { y: 9, label: "Paid Search" },
    //             { y: 5, label: "Referral" },
    //             { y: 19, label: "Social" }
    //         ]
    //     }]
    // }


    return (
        <div className='container' Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            <Sidebar />

            <div className='profile'>
                <div className='ProfileAndName'>
                    <Avatar sx={{ height: '58px', width: '58px' }} />
                    <div className='nameAndActive'>
                        <div className='name'>Name</div>
                        <p>user since..</p>
                    </div>
                </div>

                <hr Style="border: 0.7px solid"/>

                <div className='allChart'>
                    <div className='QuesChart'>
                        <div className='title'>No of asked questions</div>

                        <div>
                            <PieChart lineWidth='60' viewBoxSize={[100, 100]}
                                data={[
                                    { title: 'React', value: 10, color: '#E38627' },
                                    { title: 'Node', value: 25, color: '#C13C37' },
                                    { title: 'Mongo', value: 5, color: '#6A2135' },
                                ]}
                            />
                        </div>
                    </div>

                    <div className='QuesChart'>
                        <div className='title'>No of given answers.</div>

                        <div>
                            <PieChart lineWidth='60' viewBoxSize={[100, 100]}
                                data={[
                                    { title: 'MERN', value: 35, color: '#E38627' },
                                    { title: 'Node', value: 25, color: '#C13C37' },
                                    { title: 'Mongo', value: 5, color: '#6A2135' },
                                ]}
                            />

                        </div>
                    </div>

                    <div className='QuesChart'>
                        <div className='title'>No of accepted answers</div>

                        <div>
                            <PieChart lineWidth='60' viewBoxSize={[100, 100]}
                                data={[
                                    { title: 'React', value: 5, color: '#E38627' },
                                    { title: 'Node', value: 5, color: '#C13C37' },
                                    { title: 'Mongo', value: 55, color: '#6A2135' },
                                ]}
                            />

                        </div>
                    </div>
                </div>

                <hr Style="border: 0.7px solid"/>

            </div>


        </div>
    )
}
