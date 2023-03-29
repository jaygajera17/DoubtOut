import React from 'react';
import '../MyProfile/ProfileSidebar/profileSidebar.css';
import { Public, Stars, Work } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className='profile_sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/adminuser">User</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/adminanalysis">Analysis</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/Adminquestions">Questions</NavLink>
                    </div>
<<<<<<< HEAD
=======
                    <div className="sidebar-option">
                        <NavLink  className="sideLink" to="/Adminanswer">answer</NavLink>
                    </div>
                    {/* <div className="sidebar-option">
                        <NavLink  className="sideLink">Badges</NavLink>
                    </div> */}
>>>>>>> 338075220802a74b62b3189b746aaeae0c69b27b
                </div>
            </div>
        </div>
    )
}
