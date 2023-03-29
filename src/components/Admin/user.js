import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AdminSidebar from './AdminSidebar';


 var mydiv = {
    margin: '8% 8%',
    };
export default function AdminUser() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
 
  const fetchUsers = async () => {
    await fetch('http://localhost:5000/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => setUsers(data))
  }

  const deleteUser = async (id) => {
    const response = axios.delete(`http://localhost:5000/api/admin/deleteUser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
    }).then((response) => {
      fetchUsers()
      window.location.reload();
      return response.json()
    })

    const data = await response.json()
    if (data.status === 'success') {
      fetchUsers()
    }
  }

  return (
    <div className='container' Style="background-color:#f8f9f9; height:100%; margin-top:20vh; z-index:1;">
      <AdminSidebar/>
      <div className='display: inline;'>
            <h3> Get User Data </h3>
      <button onClick={fetchUsers}>Fetch Users</button>
      <table className="table"  style={{width: '100%'}}>
              <thead>
                <tr className="table-primary">
                  <th  scope="col" >User Name </th>
                  <th scope="col">User Email</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              </table>
            
      <div>
        {users.map((user) => {
          return (
            <div>
            <table className="table table-bordered" style={{width: '100%'}}>
              <tbody>
                <tr> 
                  <th scope="row">{user.id}</th>
                  <td style={{textAlign: 'left', width: '100%'}} ><button onClick={fetchUsers}>{user.username}</button></td>
                  <td style={{textAlign: 'left', width: '100%'}}>{user.email}</td>
                  <td style={{textAlign: 'center', width: '40%'}}>
                    <button className="fa fa-trash" aria-hidden="true" onClick={() => deleteUser(user._id)}></button>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          )
        })}
      </div>
    </div>
    </div>
    
  )
}
