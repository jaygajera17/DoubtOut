import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';


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
            headers:{
                'Content-Type':'application/json'
            }
        });
        
        const json = await response.json();

        setnoOfAns(json);
        
    }

    const Points = async ()=>{
        const response = await fetch("http://localhost:5000/api/answer/points",{
            method : "POST",
            headers : {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();
        setPoints(json["points"]);
    }

    useEffect(()=>{
        fetchAllQuestions();
        FindFrequencyOfAns();
        Points();
    }, [])

    return (
        <div className='container' Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            <div class="d-flex flex-column flex-shrink-0 p-3 col-md-7" Style="background-color:white;">
                <div className="d-flex d-flex-row align-items-center">
                    <h1 className='mx-4'>All Questions</h1>
                    <div>Points {points}</div>
                    <button className="btn btn-primary mx-4" Style="position:absolute; right:0px;" >Ask Question</button>
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
                                                    ()=>{
                                                        if(question._id in noOfAns){
                                                            return (<>{noOfAns[question._id]} Answers</>);
                                                        }
                                                        else{
                                                            return (<>0 Answers</>);
                                                        }
                                                    }
                                                )()}
                                               


                                            </div>

                                            <div class="d-flex flex-column flex-shrink-0 col-md-10">
                                                <NavLink to={{ pathname: `/answer/${question._id}` }} className="card-title" Style="text-decoration:none;color:#0074CC"><h4>{question.title}</h4></NavLink>
                                                <small Style="font-size:1px;">{parse(question.question)[0]}</small>
                                                {/* {(() => {
                                            var msg = parse(question.question);

                                            return (<><small className='fs-8'>{msg[0]}</small></>);
                                        })()} */}
                                                <div className='mt-3'>{question.tags.split(" ").map(tag => <small className='mx-2 px-2 py-1' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</small>)}</div>
                                                <small className='d-flex flex-row-reverse'> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy}&nbsp;</p></small>
                                                
                                                {/* <p class="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </ul>
                    )}


            </div>
        </div>
    )
}
