// import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom';
// import parse from 'html-react-parser';
// import axios from 'axios';
// import '../Questions/questions.css';
// import '../Header/header.css';
// import AdminSidebar from './AdminSidebar';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// export default function Adminanswer() {

//     const navigate = useNavigate();
//     // const editor = useRef(null);
//     const params = useParams();
//     // const [value, setValue] = useState("");
//     const [question, setQuestion] = useState([])
//     const [html, setHtml]= useState("");
//     // const [state, setState] = useState(false);
//     const [answers, setAnswers] = useState([]);
//     const [vote, setVotes] = useState({});
//     const [voteStatus, setVoteStatus] = useState({});
//     const [loginstatus, setloginstatus] = useState(false);
//     const [answerstatus, setanswerstatus] = useState({});
//     const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "", status: "" });


//     const onChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value })
//     }

//     useEffect(() => {
//         fetch(`http://localhost:5000/api/answer/fetchUserAnswers/${localStorage.getItem("username")}`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(response => {
//             console.log(response);
//             return response.json();
//         }).then(data => setAnswers(data));
//     },[]);

//     const fetchAllFilteredAnswers = async () => {
//         const response = await fetch(`http://localhost:5000/api/answer/fetchUserFilteredAnswers/${localStorage.getItem("username")}`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags , status:filters.status})

//         }).then(response => {
//             return response.json();
//         }).then(data => setAnswers(data));
//     };

//     const [usedTags, setUsedTags] = useState([]);
//     useEffect(() => {
//         fetch(`http://localhost:5000/api/answer/givenAnswersTags/${localStorage.getItem("username")}`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(response => {
//             return response.json();
//         }).then(data => setUsedTags(data));
//     }, []);

//     console.log(usedTags);

//     useEffect(() => {
//         fetchAllFilteredAnswers();
//     }, [filters])

//     // const [count, setCount] = useState(0);
//     const count=1;

//     // const fetchAnswers = async (id) => {
//     //     await fetch(`http://localhost:5000/api/answer/fetchanswer`, {
//     //         method: "POST",
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         }
//     //     }).then(response => {
//     //         return response.json();
            
//     //     }).then((data) => {
//     //         setAnswer(data);
//     //     })
//     // }

    
    
//     const fetchVotes = async () => {

//         const response = await fetch(`http://localhost:5000/api/answer/fetchVotes`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });

//         let json = await response.json();

//         setVotes(json);
//     }
//     const increment = () => {
//         count=count+1;
//     }

//     useEffect(() => {
        
//         fetchAnswers(params.type);
//         fetchVotes();
        
       
//         // convertToHTML();
//     }, [voteStatus, answerstatus])
//     // useEffect(() => {
//     //     (setCount(count + 1));
//     // }, [count])

    


//     return(
//         <>
//               <div className='' Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;">       
//                  <AdminSidebar/>
//               </div>
//                 {/* <div className="container" Style="margin-top:10vh;">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h4 className="card-title">Answers</h4>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="table-responsive">
//                                         <table className="table">
//                                             <thead className=" text-primary">
//                                                 <th>
//                                                     Answer
//                                                 </th>
//                                                 <th>
//                                                     Votes
//                                                 </th>
//                                                 <th>
//                                                     Upvote
//                                                 </th>
//                                                 <th>
//                                                     Downvote
//                                                 </th>
//                                                 <th>
//                                                     Accept
//                                                 </th>
//                                             </thead>
//                                             <tbody>
//                                                 {answers.map((answer) => {
//                                                     return (
//                                                         <tr>
//                                                             <td>
//                                                                 {parse(answer.answer)}
//                                                             </td>
//                                                             <td>
//                                                                 {vote[answer._id]}
//                                                             </td>
//                                                             <td>
//                                                                 <button className="btn btn-primary" onClick={(e) => upvote(e, answer._id)}>Upvote</button>
//                                                             </td>
//                                                             <td>
//                                                                 <button className="btn btn-primary" onClick={(e) => downvote(e, answer._id)}>Downvote</button>
//                                                             </td>
//                                                             <td>
//                                                                 <button className="btn btn-primary" onClick={(e) => acceptAnswer(e, answer._id)}>Accept</button>
//                                                             </td>
//                                                         </tr>
//                                                     )
//                                                 })}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> 
//                  </div> */}


// <div className='filters_menu'>
//                     <strong Style="display:inline">Find given answers between : </strong>
//                     <input type="date" name="startDate" onChange={onChange} />
//                     <strong Style="display:inline">To</strong>
//                     <input type="date" name="endDate" onChange={onChange} />
//                     <strong Style="display:inline">and in tag:</strong>
//                     <select name="tags" onChange={onChange} >
//                         <option value="none" selected disabled hidden>select a tag</option>
//                         {usedTags.map(tag => <option value={tag}>{tag}</option>)}
//                     </select>

//                     <input type="radio" name="status" value="Accepted" onChange={onChange}/>
//                     <label for="accepted">Accepted</label>
//                     <input type="radio" name="status" value="Not Accepted" onChange={onChange}/>
//                     <label for="notAccepted">Not Accepted</label>
//                 </div>


//               <div className="container" Style="height:100vh;width:70%;display:block; margin:auto;">

// <h1>{question.title}</h1>
// <div className='mt-5'>{html}</div>
// <hr style={{
//     background: "black",
//     height: "2px",
//     border: "none",
// }}
// /><hr />

// <h4>{answers.length}  Answers</h4>
// {answers.length > 0 && (
//     <div className='mt-5'>
//         {answers.map((ans) => (
         
//             <div className="">
//                 <div className="d-flex flex-row">  
//                     <div class="d-flex flex-column col-md-0 mt-0 mx-0">
//                         {/* <button className='btn btn-white' onClick={(e) => upvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-up" Style="font-size: 35px;"></i></button> */}
//                         {/* <div className='mx-3'> {count+1} </div> */}
//                         {/* <button className='btn btn-white' onClick={(e) => downvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-down" Style="font-size: 35px;"></i></button> */}
//                         {/* <button className='btn btn-white' onClick={(e) => acceptAnswer(e, ans._id)}><i class="fa fa-check" Style="font-size:25px;"></i></button> */}
//                         {(
//                             ()=>{
//                                 if(ans.status === "Accepted")
//                                 {
//                                     return (<><button className='btn btn-white'><i class="fa fa-check" Style="font-size:25px;color:lightgreen;"></i></button></>)
//                                 }
//                                 // else{
//                                 //     return (<><button className='btn btn-white' onClick={(e) => acceptAnswer(e, ans._id)}><i class="fa fa-check" Style="font-size:25px;"></i></button></>)
//                                 // }
//                             }
//                         )()}
//                     </div>
//                     <div class="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
//                         <p>{parse(ans.answer)}</p>


//                         <small className='d-flex flex-row-reverse'>Posted By : {ans.postedBy}</small>
//                     </div>
//                 </div>

//                 {/* <p class="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p> */}

//                 <hr style={{
//                     background: "#959595",
//                     height: "2px",
//                     border: "none",
//                 }}
//                 /><hr />

//             </div>
//         ))}
//     </div>
// )}
// </div>

                
           
//         </>
//     )
// }

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileSidebar from './AdminSidebar';
import Pagination from '../Questions/Pagination';
import PostsAns from './PostAns';



export default function Adminanswer() {

    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "", status: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const [answers, setAnswers] = useState([]);

    // for pagination in Answers in profile section.
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

   

    // This function will find the No. of answers given by a User
    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/fetchUseranswer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => setAnswers(data));
    },[]);

    const fetchAllFilteredAnswers = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchAllFilteredAnswers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags , status:filters.status})

        }).then(response => {
            return response.json();
        }).then(data => setAnswers(data));
    };

   

    const [usedTags, setUsedTags] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/givenAllAnswersTags/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setUsedTags(data));
    }, []);

    console.log(usedTags);

    useEffect(() => {
        fetchAllFilteredAnswers();
    }, [filters])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <div className="container" Style="height:100vh;margin-top:13vh; z-index:1; background-color:white">
            <ProfileSidebar />
            <div className='header_and_content'>

                {/* filter based on date , tags and status  */}
                <div className='filters_menu'>
                    <strong Style="display:inline">Find given answers between : </strong>
                    <input type="date" name="startDate" onChange={onChange} />
                    <strong Style="display:inline">To</strong>
                    <input type="date" name="endDate" onChange={onChange} />
                    <strong Style="display:inline">and in tag:</strong>
                    <select name="tags" onChange={onChange} >
                        <option value="none" selected disabled hidden>select a tag</option>
                        {usedTags.map(tag => <option value={tag}>{tag}</option>)}
                    </select>

                    <input type="radio" name="status" value="Accepted" onChange={onChange}/>
                    <label for="accepted">Accepted</label>
                    <input type="radio" name="status" value="Not Accepted" onChange={onChange}/>
                    <label for="notAccepted">Not Accepted</label>
                </div>


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

