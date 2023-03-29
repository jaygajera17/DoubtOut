import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
      <AdminSidebar />
      <div Style="display:block">
        <h3> Get User Data </h3>
        <button onClick={fetchUsers}>Fetch Users</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th Style='text-align: left; width:25%' scope="col" >User Name </th>
              <th Style='text-align: center; width:40%' scope="col">User Email</th>
              <th Style='text-align: center; width:40%' scope="col">Delete</th>
            </tr>
          </thead>
        </table>

        <div>
          {users.map((user) => {
            return (
              <div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">{user.id}</th>
                      <td Style='text-align: left; width:25%' >
                        <button><NavLink to={{ pathname: `/UserProfileAnalysis/${user.username}`}}>{user.username}</NavLink></button>
                      </td>
                      <td Style='text-align: center; width:40%'>{user.email}</td>
                      <td Style='text-align: center; width:40%'>
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
