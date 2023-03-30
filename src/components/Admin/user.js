import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


var mydiv = {
  margin: '8% 8%',
};
export default function AdminUser() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json()
    setUsers(data)
    setFilteredUsers(data)
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = users.filter((user) => {
      return user.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredUsers(filteredData);
  };


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
      <div class="input-group">
      <div class="form-outline">
        <input type="text" className='form-control' placeholder="Search From UserName" name="search" onChange={handleSearch} />
        </div>
        <button id="search-button" type="button" class="btn btn-primary">
    <i class="fa fa-search"></i>
  </button>
  </div>
  

        
        {/* {fetchUsers} */}
        {/* <button onClick={fetchUsers}>Fetch Users</button> */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th  style={{ width: '250px',textAlign:'center', height: '40px' }}scope="col" >User Name </th>
              <th style={{ width: '250px',textAlign:'center', height: '40px' }} scope="col">User Email</th>
              <th style={{ width: '250px',textAlign:'center', height: '40px' }} scope="col">Delete</th>
            </tr>
          </thead>
        </table>

        <div>
          {filteredUsers.map((user) => {
            return (
              <div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      {/* <th scope="row">{user.id}</th> */}
                      <td style={{ width: '250px',textAlign:'center', height: '40px' }} >
                        <button className='btn btn-outline-primary' style={{ width: '150px', height: '40px' }}><NavLink to={{ pathname: `/UserProfileAnalysis/${user.username}`}}>{user.username}</NavLink></button>
                      </td>
                      <td  style={{ width: '250px',textAlign:'center', height: '40px' }}>{user.email}</td>
                      <td style={{ width: '250px',textAlign:'center', height: '40px' }}>
                        <Button  variant="outlined" startIcon={<DeleteIcon />}  aria-hidden="true" onClick={() => deleteUser(user._id)}>     delete
</Button>
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
