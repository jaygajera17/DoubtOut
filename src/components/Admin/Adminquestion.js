import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import '../Questions/questions.css';
import '../Header/header.css';
import AdminSidebar from './AdminSidebar';
import Pagination from '../MyProfile/MyQuestions/Pagination';
import ProfileSidebar from './AdminSidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function Adminquestion() {

    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }
   
    const [questions, setQuestions] = useState([])

    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes]  = useState({});
    const [usedTags, setUsedTags] = useState([]);
     // for pagination in questions in profile
     const [postPerPage] = useState(4);
     const [currentPage, setcurrentPage] = useState(1);
     const [filteredQue, setFilteredQue] = useState([]);
     const [searchQuery, setSearchQuery] = useState("");

     const indexOfLastPost = currentPage * postPerPage;
     const indexOfFirstPost = indexOfLastPost - postPerPage;
     const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);
 
     const paginate = pageNum => setcurrentPage(pageNum);
    
    const fetchAllFilteredQuestions = async () => {
        const response = await fetch(`http://localhost:5000/api/question/fetchUserFilteredQuestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags })

        });
        const data = await response.json();
        setQuestions(data);
        setFilteredQue(data);
    };
    useEffect(() => {
        fetch(`http://localhost:5000/api/question/usedtags`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setUsedTags(data));
    }, []);
    
    useEffect(() => {
        fetchAllFilteredQuestions();
    }, [filters])

    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchquestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    },[]);


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

    const fetchAllQuestions = async () => {
        await fetch("http://localhost:5000/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }




    
    const fetchVotes = async()=>{

        const response = await fetch(`http://localhost:5000/api/question/fetchallVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();
        setVotes(json);

    }

    const deleteQuestion = async (id) => {
        const response = await fetch(`http://localhost:5000/api/question/deleteque/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // fetchQuestions()
            window.location.reload();
            return response.json()
        })
        const data = await response.json()
        if (data.status === 'success') {
            // fetchQuestions()
        }
    }

    useEffect(() => {
        // fetchAllQuestions();
        FindFrequencyOfAns();
        fetchVotes();
        fetchAllQuestions();
    }, [])

    const searchHandler = (searchQuery) => {
        setSearchQuery(searchQuery.target.value);
        const filteredData = questions.filter((question) => {
            return question.title.toLowerCase().includes(searchQuery.target.value.toLowerCase());
        });
        setFilteredQue(filteredData);
    };

   
    return (
        <>
        <div className="container" Style="height:100vh;margin-top:13vh; z-index:1; background-color:white">
            <ProfileSidebar/>
              <div className='header_and_content'>
            
           
            <br></br>

        {/* <div style={{ marginTop: '10px', marginLeft: '50px' }}> */}
            <div className='filters_menu'>
                    <strong Style="display:inline">Find All questions between : </strong>
                    <input type="date" name="startDate" onChange={onChange} /> 
                    <strong Style="display:inline">To</strong>
                    <input type="date" name="endDate" onChange={onChange} />
                    <strong Style="display:inline">and in tag:</strong>
                    <select name="tags" onChange={onChange} >
                        <option value="none" selected disabled hidden>select a tag</option>
                        {usedTags.map(tag => <option value={tag}>{tag}</option>)}
                    </select>
                </div>
                {/* </div> */}
            <div class="input-group">
      <div class="form-outline">
        <input type="text" Style="display:inline" className='form-control' placeholder="Search From Que. Title" name="search" onChange={searchHandler} />
        </div>
        <button id="search-button" type="button" class="btn btn-primary">
    <i class="fa fa-search"></i>
  </button>
  </div>
           <ul>

{filteredQue.map(question => (

    <div class="card mt-1">

        <div class="card-body">
            <div className="d-flex flex-row">

                <div class="d-flex flex-column flex-shrink-0 col-md-2 mt-4 mx-0">

                    <div>0 votes</div>
                    {(
                        () => {
                            if (question._id in noOfAns) {
                                return (<div>{noOfAns[question._id]} Answers</div>);
                            }
                            else {
                                return (<>0 Answers</>);
                            }
                        }
                    )()}



                </div>

                <div class="d-flex flex-column flex-shrink-0 col-md-10">
                    <NavLink to={{ pathname: `/question/${question._id}` }} className="card-title" Style="text-decoration:none;color:#0074CC"><h4>{question.title}</h4></NavLink>
                    <small Style="font-size:1px;">{parse(question.question)[0]}</small>
                 
                    <div className='mt-3'>{question.tags.split(" ").map(tag => <small className='mx-2 px-2 py-1' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</small>)}</div>
                    <small className='d-flex flex-row-reverse'> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy}&nbsp;</p></small>
                </div>
            </div>
            <Button  variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteQuestion(question._id)}>delete</Button>
        </div>
       
        
    </div>

))}
</ul>
{/* <div className="container">
                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                </div> */}
       </div>
       </div>
        </>
        )


}