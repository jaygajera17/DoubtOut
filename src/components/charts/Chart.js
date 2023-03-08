// please install npm install react-apexcharts apexcharts

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function Analysis({title,count,Tags}) {
    return(
                   // chart from react-apexcharts
                    <Chart
                        type="pie"
                        width={500}
                        height={500}

                        series={count}

                        options={{
                            title: {
                                text: title
                            },
                            noData: { text: "Empty Data" },
                            // colors:["#f90000","#f0f"],
                            labels: Tags
                        }}
                    >
                    </Chart>
    );
}



































// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import parse from 'html-react-parser';
// import { PieChart } from 'react-minimal-pie-chart';
// import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
// import ProfileHeader from '../ProfileHeader/ProfileHeader';

// import './chart.css'

// export default function Chart() {

//     const [questions, setQuestions] = useState([]);

//     const freqOfTags = new Map();
//     const [pieData,setData] = useState([]);

//     const fetchAllQuestions = async () => {

//         await fetch(`http://localhost:5000/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(response => {
//             return response.json();
//         }).then(data => setQuestions(data));
//     }

//     const findFreqOfTags = async () => {
//         questions.map(question => question.tags.split(" ").map(tag => {
//             freqOfTags[tag] = 0;
//         }))

//         questions.map(question => question.tags.split(" ").map(tag => {
//             freqOfTags[tag] = freqOfTags[tag]+1;
//         }))

//         console.log(freqOfTags);

//         const data = this.state.freqOfTags.map((key, value) => {
//             return { 'title': key, 'value': value, 'color': '#E38627'};
//         })

//         setData(data);
        
//     }


//     useEffect(() => {
//         fetchAllQuestions();
//         findFreqOfTags();
//     }, [])



//     return (
//         <div>
//             <div className="container" Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
//                 <ProfileSidebar />
//                 <div className='header_and_content'>
//                     <ProfileHeader />

//                     <div className='allChart'>
//                         <div className='QuesChart'>
//                             <div className='title'>No of asked questions</div>
//                             {/* data.map(question = > question.tags.split(" ").map(tag => <span>{tag}</span>)) */}
                 

//                             <div>
//                                 <PieChart lineWidth='60' viewBoxSize={[100, 100]}
//                                     data={pieData}
//                                 />
//                             </div>
//                         </div>

//                         <div className='QuesChart'>
//                             <div className='title'>No of given answers.</div>

//                             <div>
//                                 <PieChart lineWidth='60' viewBoxSize={[100, 100]}
//                                     data={[
//                                         { title: 'MERN', value: 35, color: '#E38627' },
//                                         { title: 'Node', value: 25, color: '#C13C37' },
//                                         { title: 'Mongo', value: 5, color: '#6A2135' },
//                                     ]}
//                                 />

//                             </div>
//                         </div>

//                         <div className='QuesChart'>
//                             <div className='title'>No of accepted answers</div>

//                             <div>
//                                 <PieChart lineWidth='60' viewBoxSize={[100, 100]}
//                                     data={[
//                                         { title: 'React', value: 5, color: '#E38627' },
//                                         { title: 'Node', value: 5, color: '#C13C37' },
//                                         { title: 'Mongo', value: 55, color: '#6A2135' },
//                                     ]}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <hr Style="border: 0.7px solid" />

//                 </div>
//             </div>
//         </div>
//     );
// }
