import React from 'react'
import { NavLink } from 'react-router-dom'
import { FilterList } from '@mui/icons-material';
import './header.css';
export default function Header() {
  return (
    <div className="main">
        <div className="main-container">
            <div className="main-top">
                <h2>All Questions</h2>
                <NavLink><button>Ask Question</button></NavLink>
            </div>

            <div className='main-dec'>
                <p>All question stat</p>
                <div className="main-filter">
                    <div className="main-tabs">
                        <div className="main-tab">
                            <NavLink>Newest</NavLink>
                        </div>
                        <div className="main-tab">
                            <NavLink>Active</NavLink>
                        </div>
                        <div className="main-tab">
                            <NavLink>More</NavLink>
                        </div>
                    </div>

                    <div className="main-filter-item">
                        <FilterList/>
                        <p>Filter</p>
                    </div>
                </div>
            </div>
            <div className="questions">
                <div className="question">
                    {/* <AllQuestions/> */}
                </div>
                 
            </div>
        </div>
    </div>
  )
}