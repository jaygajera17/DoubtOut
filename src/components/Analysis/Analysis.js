import React, { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import Chart from "../charts/Chart";
import './analysis.css';

export default function Analysis() {

    //for fetching tags of asked questions.
    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
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


    //for fetching tags of accepted answered question.
    const [acceptedansweredQues, setAcceptedAnsweredQues] = useState([]);
    const [AcAnsTags, setAcAnsTags] = useState([]);
    const [AcAnscount, setAcAnsCount] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/fetchUserAcceptedAnsweredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => setAcceptedAnsweredQues(data));
    }, []);

    useEffect(() => {
        // console.log(answers);
        const ac_ans_freqOfTags = [];
        const ac_ans_tag = [];
        const ac_ans_cnt = [];

        acceptedansweredQues.map(ques => {
            const tags = ques[0].tags;
            tags.split(" ").map(tag =>
                ac_ans_freqOfTags[tag] = 0
            )
        })

        acceptedansweredQues.map(ques => {
            const tags = ques[0].tags;
            tags.split(" ").map(tag =>
                ac_ans_freqOfTags[tag] = ac_ans_freqOfTags[tag] + 1
            )
        })

        for (const i in ac_ans_freqOfTags) {
            ac_ans_tag.push(i);
            ac_ans_cnt.push(parseInt(ac_ans_freqOfTags[i]));
        }

        setAcAnsTags(ac_ans_tag);
        setAcAnsCount(ac_ans_cnt);

    }, [acceptedansweredQues]);


    //for fetching tags of answered questions
    const [answeredQues, setAnsweredQues] = useState([]);
    const [AnsTags, setAnsTags] = useState([]);
    const [Anscount, setAnsCount] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/fetchUserAnsweredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => setAnsweredQues(data));
    }, []);

    useEffect(() => {
        console.log(answeredQues);
        const ans_freqOfTags = [];
        const ans_tag = [];
        const ans_cnt = [];

        answeredQues.map(ques => {
            const tags = ques[0].tags;
            tags.split(" ").map(tag =>
                ans_freqOfTags[tag] = 0
            )
        })

        answeredQues.map(ques => {
            const tags = ques[0].tags;
            tags.split(" ").map(tag =>
                ans_freqOfTags[tag] = ans_freqOfTags[tag] + 1
            )
        })

        for (const i in ans_freqOfTags) {
            ans_tag.push(i);
            ans_cnt.push(parseInt(ans_freqOfTags[i]));
        }

        setAnsTags(ans_tag);
        setAnsCount(ans_cnt);

    }, [answeredQues]);

    return (
        <div>
            <div className="container" Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
                <ProfileSidebar />
                <div className='header_and_content'>
                    <ProfileHeader />

                    <div className="charts">
                        <div className="first_row">
                            <Chart title="No of questions asked by you in particular tag" count={count} Tags={Tags} />
                            <Chart title="No of answers given by you in particular tag" count={Anscount} Tags={AnsTags} />
                        </div>
                        <div className="last_chart">
                            <Chart title="No of your answers accepted by user in particular tag" count={AcAnscount} Tags={AcAnsTags} />
                        </div>
                    </div>

                    <hr Style="border: 0.7px solid" />

                </div>
            </div>
        </div>

    );
}
