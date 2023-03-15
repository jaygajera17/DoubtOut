import React, {useState, useEffect} from 'react'
import { Avatar } from '@mui/material';
import './profileHeader.css';

export default function ProfileHeader() {

    const [points, setPoints] = useState(0);

    const Points = async ()=>{
        const response = await fetch("http://localhost:5000/api/answer/points",{
            method : "POST",
            headers : {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();
        setPoints(json["points"]);
    }

    useEffect(()=>{
        Points();
    }, [])

    return(
        <div className='profile'>
            <div className='ProfileAndName'>
                <Avatar sx={{ height: '58px', width: '58px' }} />
                <div className='nameAndActive'>
                    <div className='name'>{localStorage.getItem("username")}</div>
                    <p>User since <strong>{localStorage.getItem("since")}</strong></p>
                    <div>Points: {points}</div>
                </div> 
            </div>

            <hr Style="border: 0.7px solid " />
        </div>
    )
}
