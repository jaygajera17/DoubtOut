import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import Chart from 'chart.js/auto'
import axios from "axios";
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

    const noOfQuestions = async () => {
        await fetch('http://localhost:5000/api/admin/noOfQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setQuestion(data)
            }
            )
    }

    const noOfAnswers = async () => {
        await fetch('http://localhost:5000/api/admin/noOfAnswers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAnswer(data)
            }
            )
    }

    const noOfAccept = async () => {
        await fetch('http://localhost:5000/api/admin/noOfAccept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAccept(data)
            }
            )
    }

    const chartall= () => {
        if(chartInstance) chartInstance.destroy();
        const ctx = document.getElementById('user-chart1').getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Users', 'Questions', 'Answers', 'Accepted Answers'],
                datasets: [{
                    label: 'Overall Report',
                    data: [user, question, answer, accept]
                }]
            }
        }); 
        setChartInstance(newChartInstance);
      // newChartInstance.reset();
    }
   
    // const chart = async () => {
    //     await fetch('http://localhost:5000/api/admin/chart', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })

    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((data) => {
    //             setquestionByMonth(data)
    //         }
    //         )
    //     if(chartInstance) chartInstance.destroy();
    //     const ctx = document.getElementById('user-chart1').getContext('2d');
    //     const newChartInstance = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //             datasets: [{
    //                 label: 'Number of question',
    //                 data: questionByMonth
    //             }]
    //         }
    //     });
    //     setChartInstance(newChartInstance);
    // }

    // const chart = async () => {
    //     await axios.get('http://localhost:5000/api/admin/chart')
    //     .then((response) => {
    //         setquestionByMonth(response.data)
    //     })
    //     if(chartInstance) chartInstance.destroy();
    //     const ctx = document.getElementById('user-chart1').getContext('2d');
    //     const newChartInstance = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //             datasets: [{
    //                 label: 'Number of question',
    //                 data: questionByMonth
    //             }]
    //         }
    //     });
    //     setChartInstance(newChartInstance);
    //     //console.log("question by month",questionByMonth);
    // }
    
    useEffect(() => {
        noOfusers();
        noOfQuestions();
        noOfAnswers();
        noOfAccept();
        chartall();
        
         //chart();
    }, [])

    
 

    return (
        <div Style="background-color:#f8f9f9; height:100%; margin-top:15vh; z-index:1;">
       <h1 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10vh',
      }}>Admin Home</h1>
       
        <h3> User Analysis</h3>
         <li><button className="btn btn-primary"><NavLink to="/adminuser"> delete user </NavLink></button></li>
         <p>No of user currently is   {user}  </p> 
         
         <br/>
        

        <h3> Question Analysis</h3>
        <li><button className="btn btn-primary"><NavLink to="/adminquestion"> delete question </NavLink></button></li>
        <p>no of total question is  {question} </p>
        <div class="chart-container" Style="position: relative; height:40vh; width:80vw">
        <canvas id="user-chart1"></canvas>
        </div>
        <br/>

        <h3> Answer Analysis</h3>
        <p> no of total answer is {answer} and out of this total answer accepted is {accept}</p>
        
        <br/>
        </div>
    );
    }