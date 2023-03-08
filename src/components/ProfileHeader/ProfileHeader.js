import React from 'react'
import { Avatar } from '@mui/material';
import './profileHeader.css';

export default function ProfileHeader() {

    return(
        <div className='profile'>
            <div className='ProfileAndName'>
                <Avatar sx={{ height: '58px', width: '58px' }} />
                <div className='nameAndActive'>
                    <div className='name'>Name</div>
                    <p>user since..</p>
                </div>
            </div>

            <hr Style="border: 0.7px solid " />
        </div>
    )
}
