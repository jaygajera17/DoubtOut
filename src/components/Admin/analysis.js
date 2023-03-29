import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import Chart from '../charts/Chart';
import '../MyProfile/Analysis/analysis.css';
import '../Header/header.css';
import '../Questions/questions.css';


export default function AdminAnalysis() {
  //const[questions,setQuestions] = useState([])
 const[NoOfQuestions,setNoofquestion]=useState([])
     const [answer, setAnswer] = useState(0);
    const [accept, setAccept] = useState(0);
    const [user, setUser] = useState(0);

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

    const navigate = useNavigate()

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
                setNoofquestion(parseInt(data))
                console.log(data)
            }
            )
            
    }

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
    
    const fetchQuestions = async () => {
        await fetch('http://localhost:5000/api/admin/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setQuestions(data)
           
            })
    }

   const [january, setJanuary] = useState(0);
const [february, setFebruary] = useState(0);
const [march, setMarch] = useState(0);
const [april, setApril] = useState(0);
const [may, setMay] = useState(0);
const [june, setJune] = useState(0);
const [july, setJuly] = useState(0);
const [august, setAugust] = useState(0);
const [september, setSeptember] = useState(0);
const [october, setOctober] = useState(0);
const [november, setNovember] = useState(0);
const [december, setDecember] = useState(0);
   
useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/admin/question-by-month');
        const data = await response.json();
  
        data.forEach(item => {
          const monthIndex = item._id - 1;
          const count = item.count;
          switch (monthIndex) {
            case 0:
              setJanuary(count);
              break;
            case 1:
              setFebruary(count);
              break;
            case 2:
              setMarch(count);
              break;
            case 3:
              setApril(count);
              break;
            case 4:
              setMay(count);
              break;
            case 5:
              setJune(count);
              break;
            case 6:
              setJuly(count);
              break;
            case 7:
              setAugust(count);
              break;
            case 8:
              setSeptember(count);
              break;
            case 9:
              setOctober(count);
              break;
            case 10:
              setNovember(count);
              break;
            case 11:
              setDecember(count);
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  const[twentyone,setTwentyone]=useState(0);
  const[twentytwo,setTwentytwo]=useState(0);
  const[twentythree,setTwentythree]=useState(0);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/api/admin/question-by-year');
            const data = await response.json();
            data.forEach(item => {
                const yearIndex = item._id - 2021;
                const count = item.count;
                switch (yearIndex) {
                    case 0:
                        setTwentyone(count);
                        break;
                    case 1:
                        setTwentytwo(count);
                        break;
                    case 2:
                        setTwentythree(count);
                        break;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    fetchData();
}, []);


  
            

   

    useEffect(() => {
        noOfusers();
        noOfQuestions();
        noOfAnswers();
        noOfAccept();
       
    }, [])
    
    return (
        <>
        <div className="container" Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;">
            <AdminSidebar />
           
                <div className='charts'>
                    <div className="first_row">
                        <Chart title="overall data" count={[user,NoOfQuestions,answer,accept]} Tags={["Users","Questions","Answers","Accepted Answers"]} />
                        <Chart title="No of questions in particular tag" count={count} Tags={Tags} />
                    </div>  
                    {'\n'} 
                    <div className="first_row">
                        <Chart title="No of questions in particular month" count={[january,february,march,april,may,june,july,august,september,october,november,december]} Tags={["january","february","march","april","may","june","july","august","september","october","november","december"]} />
                        <Chart title="No of questions in particular year" count={[twentyone,twentytwo,twentythree]} Tags={["2021","2022","2023"]} />
                    </div>
                 </div>
           
        </div>
        </>
       
    )
}
