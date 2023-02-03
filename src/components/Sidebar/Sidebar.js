import React from 'react';
import { Public } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <a href="/">Home</a>
                    </div>
                    <div className="sidebar-option">
                        <a href="/">PUBLIC</a>
                        <div className="link">
                            <div className="link-tag">
                                    <Public />
                                    <a>Questions</a>
                            </div>
                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
