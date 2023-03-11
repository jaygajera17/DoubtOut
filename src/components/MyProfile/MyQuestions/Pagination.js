import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination' aria-label="Page navigation example">
                {pageNumbers.map(number => (
                    <li ClassName="page-item"><NavLink ClassName="page-link" onClick={() => paginate(number)}>{number}</NavLink></li>
                ))}
            </ul>
        </nav>
    )
}
