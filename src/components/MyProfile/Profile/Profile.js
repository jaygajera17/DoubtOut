import React from 'react'
import './profile.css';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

export default function Profile() {
    return (
        <div className='container' Style="height:100vh; margin-top:13vh; z-index:1; background-color:white"> 
            <ProfileSidebar/>
            <ProfileHeader/>
        </div>
    )
}
