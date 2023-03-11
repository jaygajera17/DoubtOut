import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'



export default function Tags() {

    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        await fetch("http://localhost:5000/api/tag/gettag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(tags => setTags(tags));

    }

    useEffect(() => {
        fetchTags();
    }, [])



    return (
        <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
            <div class="">


                <div className="stack-index">
                    <div className="stack-index-content" >
                        <Sidebar />

                        <div className="main">

                            <h1>Tags</h1>
                            <div className='mt-3'>A tag is a keyword or label that categorizes your question with other, similar questions. <br></br>Using the right tags makes it easier for others to find and answer your question.</div>


                            <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">

                                {tags.length > 0 && tags.map(tag => (
                                    <div class="col">
                                        <div class="card h-100">
                                            {/* <img src="..." class="card-img-top" alt="..."> */}
                                            <div class="card-body">
                                                <NavLink className="card-title p-1" to={{ pathname: `/questionOntags/${tag.tagname}` }} Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px; display:inline;">{tag.tagname}</NavLink>
                                                <p className="card-text m-2">{tag.desc.slice(0, 100)}...</p>
                                            </div>
                                        </div>
                                    </div>

                                ))}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
