import React from 'react';
import './card.css';

export default function Card(props) {
  return (
    <>
     <div className="card1">
          <div className="card__image">
            <img src={props.src} style={{height:"300px",backgroundColor:""}} />
          </div>
          <div className="card__copy">
              <h3>{props.title}</h3>
              {/* <h2>27 October, Noon.</h2> */}
            <p>
            {props.description}
            <br></br>
            <button className='btn btn-primary mb-4' href="/">Join</button>
             
            </p>
          </div>
        </div>
     
    </>
    
  )
}