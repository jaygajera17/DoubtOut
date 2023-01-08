import React from 'react'
import { NavLink } from 'react-router-dom'

// var iconstyle = {
//     marginleft: "10px",
//     textDecoration: "none",
// }
var title = {
    // color: "lightgreen",
    // color: "#0D6EFD",
    color: "white"
}
export default function Footer() {
    return (
        <footer className="text-center text-lg-start bg-primary" Style="position:fixed; bottom:0px;width:100%;">

            <div className="text-center p-3 fs-5">
                <NavLink to="/" Style="text-decoration:none;">
                    &nbsp;<i Style={title}>Doubt</i><b Style="color:black;">Out</b>
                </NavLink>

            </div>
            {/* <div>
                <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black' }}>
                    <a href="/" style={iconstyle}>
                        &nbsp;<i style={title}>Doubt</i><b>Out</b>
                    </a>
                </div>
               
            </div> */}

        </footer>
    )
}
