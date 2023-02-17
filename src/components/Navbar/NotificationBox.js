import React from 'react';
import './Navbar.css';

export default function NotificationBox(props) {
  return (
    <>
     <div className="card2">
          <div className="card__copy">
              <h3>{props.title}</h3>
            <p>
            {props.description}     
            </p>
          </div>
        </div>
     
    </>
    
  )
}