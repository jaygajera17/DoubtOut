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
                <NavLink to="/editor"><button>Ask Question</button></NavLink>
            </div>

            <div className='main-desc'>
                <p>All question stat</p>
                <div className="main-filter">
                    <div className="main-tabs">
                        <div className="main-tab">
                            <NavLink className="tab">Newest</NavLink>
                        </div>
                        <div className="main-tab">
                            <NavLink>Active</NavLink>
                        </div>
                        <div className="main-tab">
                            <NavLink Style="color: rgb(125, 119, 119);">More</NavLink>
                        </div>
                    </div>

                    <div className="main-filter-item">
                        <FilterList style={{ fontSize: '21px' }}/>
                        <p className="filter-text">Filter</p>
                    </div>
                </div>
            </div>
            <div className="questions">
                <div className="question">
                  
                </div>
                 
            </div>
        </div>
    </div>
  )
}
