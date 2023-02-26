import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function AdminQestion() {
  const[questions,setQuestions] = useState([])
    const navigate = useNavigate()
    const fetchQuestions = async () => {
        await fetch('http://localhost:5000/api/admin/fetchquestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => setQuestions(data))
    }
    const deleteQuestion = async (id) => {
        const response = axios.delete(`http://localhost:5000/api/admin/deleteQuestion/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            fetchQuestions()
            window.location.reload();
            return response.json()
        })
        const data = await response.json()
        if (data.status === 'success') {
            fetchQuestions()
        }
    }
    return (
        <div Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;">
            <h3> Get Question Data </h3>
            <button onClick={fetchQuestions}>Fetch Questions</button>
            <table className="table ">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Question </th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
            </table>
            <div>
                {questions.map((question) => {
                    return (
                        <table className="table ">
                            <tbody>
                                <tr>
                                    <td>{question.question}</td>
                                    <td><button onClick={() => deleteQuestion(question._id)}>Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
                )}
            </div>
        </div>
    )
}
