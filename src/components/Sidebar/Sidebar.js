import React from 'react';
import './Sidebar.css';
import { Public, Stars, Work, AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <NavLink to="/">Home</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink >PUBLIC</NavLink>
                        <div className="link">
                            <div className="link-tag">
                                <Public />
                                <NavLink to="/questions">Questions</NavLink>
                            </div>
                            <div className="tags">
                                <NavLink to="/tags" className="mt-1 mb-1">tags</NavLink>
                                
                            </div>
                            <div className="link-tag">
                                <AccountCircle />
                                <NavLink to="/profile">Profile</NavLink>
                            </div>
                        </div>
                    </div>
                    {/* <div className="sidebar-option">
                        <p>COLLECTIVES</p>
                        <div className="link">
                            <div className="link-tag">
                                <Stars />
                                
                                <NavLink>Explore Collectives</NavLink>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="sidebar-option">
                        <p>FIND A JOB</p>
                        <div className="link">
                            <div className="tags">
                                <NavLink>jobs</NavLink>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='sidebar-option'>
                        <p>TEAMS</p>
                        <div className="link-tag">
                            <Work />
                            <NavLink>Companies</NavLink>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
