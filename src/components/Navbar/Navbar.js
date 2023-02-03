import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
// var well = {
//   boxShadow: "0px 0px 10px 0px #f0f0f0"
// }
var iconstyle = {
  marginleft: "10px",
  textDecoration: "none"
}
var title = {
  // color: "lightgreen",
  color: "#0D6EFD",
}
export default function Navbar() {

  const [loginStatus, setLoginStatus] = useState(false);
 
  const isLoggedin = () => {
    if (localStorage.getItem('username') !== null) {
      
      setLoginStatus(true);
    }
  }

  const logout = () => {
   
    localStorage.removeItem('username');


    setLoginStatus(false);

    window.location.reload(true);

    // navigate("/");


}

  useEffect(() => {
    isLoggedin();
  }, [loginStatus])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;">
        {/* <img src={require('./Doubt2.jpg')}   height="30" width="30" alt="image" /> */}
        <div className="container-fluid">
          <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black' }}>
            <a href="/" style={iconstyle}>
              &nbsp;<i style={title}>Doubt</i><b>Out</b>
            </a>
          </div>


          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsSscrollHheight: "100px" }}>
            <li className="nav-item dropdown" >
              <a className="nav-link dropdown-toggle" href="/" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" style={{ color: 'black' }}>
                <li><NavLink className="dropdown-item" to="/questions">Questions</NavLink></li>
                <li><a className="dropdown-item" href="/editor">Code Editor</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">FAQ</a></li>
              </ul>
            </li>
          </ul>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll" >
            <form className="d-flex" style={{ width: 500 }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">Search</button>

            </form>
            <div className="searchbar">

            </div>
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" Style={{ bsSscrollHheight: "100px" }}>
              <li class="nav-item">
                <a className="nav-link mr" href="/editor" style={{ color: 'black' }}><button className='btn btn-outline dark'>&lt;/&gt;</button></a>
              </li>

            </ul>

            <NavLink to='/profile' className='btn btn-white mr-2'>{localStorage.getItem("username")}</NavLink>
            <button className='btn btn-white mr-2'><i className="fa fa-home"></i></button>
            <button className='btn btn-white  mr-2'><i className="fa fa-question" aria-hidden="true"></i></button>
            <button className='btn btn-white mr-2'><i className="fa fa-trophy"></i></button>

            <ul className="navbar-nav " Style={{ bsSscrollHheight: "100px" }}>

              {loginStatus === true

                ?
                (
                  <li class="nav-item">
                    <button className='btn btn-outline-primary' onClick={logout}>Logout</button>
                  </li>
                )
                :
                (<><li class="nav-item">
                  <NavLink className="nav-link" to="/login" style={{ color: 'black' }}><button className='btn btn-outline-primary'>Login</button></NavLink>
                </li>
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/register" style={{ color: 'black' }}><button className='btn btn-primary'>Register</button></NavLink>
                  </li></>)
              }

            </ul>


            {/* <img src={require('./doubt.jpg')}   height="60" width="130" alt="CoolBrand"/> */}
          </div>
        </div>
      </nav>

    </div>
  )
}