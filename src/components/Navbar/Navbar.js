
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NotificationBox from './NotificationBox'
import { useState, useEffect } from 'react'
import './Navbar.css'

// let nodemailer = require("nodemailer");
// var well = {
  // boxShadow: "0px 0px 10px 0px #f0f0f0"
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
  
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [show, setShow] = useState(false);

  // const [questions, setQuestions] = useState([]);

  const isLoggedin = () => {
    if (localStorage.getItem('username') !== null) {

      setLoginStatus(true);
    }
  }

  // const sendMail = async (req, res) => {

    // let testAccount = await nodemailer.createTestAccount();


    // let transporter = await nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: 'amalia22@ethereal.email',
    //     pass: 'R58kDqqCbnw1wwACfX',
    //   },
    // });

    // let info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "darshitbhuva1@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
  // }

  const logout = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('since');
    localStorage.removeItem('Usertype');

    setLoginStatus(false);

    window.location.reload(true);

    navigate("/");
  }

  const searchQuestion = async (e) => {

    e.preventDefault();
    const que = document.getElementById('searchQue').value;

    await fetch(`http://localhost:5000/api/question/search?keyword=${que}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(questions => {

      navigate("/search", { state: questions });
      // setQuestions(data);
    })

    // console.log(questions.length);




  }

  useEffect(() => {
    isLoggedin();
  }, [loginStatus])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;">
        {/* <img src={require('./Doubt2.jpg')}   height="30" width="30" alt="image" /> */}
        <div className="container-fluid">
          <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black', paddingTop: "10px" }}>
            <a href="/" style={iconstyle}>
              &nbsp;<i style={title}>Doubt</i><b>Out</b>
            </a>
          </div>


          {localStorage.getItem("Usertype") === 'user' && (
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsSscrollHheight: "100px" }}>
            <li className="nav-item dropdown" >
              <a className="nav-link dropdown-toggle" href="/" id="navbarScrollingDropdown" role="button" aria-expanded="false" style={{ color: 'black' }}>
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" style={{ color: 'black' }}>
                <li><NavLink className="dropdown-item" to="/questions">Questions</NavLink></li>
                <li><a className="dropdown-item" href="/editor">Code Editor</a></li>
                <li><hr className="dropdown-divider" /></li>
                {/* <li><a className="dropdown-item" href="/">FAQ</a></li> */}
              </ul>
            </li>
          </ul>)}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll" >
            <form className="d-flex" style={{ width: 500 }} onSubmit={searchQuestion}>
              <input className="form-control me-2" id="searchQue" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">Search</button>

            </form>
            <div className="searchbar">

            </div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" Style={{ bsSscrollHheight: "100px" }}>
                <li class="nav-item">
            {localStorage.getItem("Usertype") === 'user' && (
                  <a className="nav-link mr" href="/editor" style={{ color: 'black' }}><button className='btn btn-outline dark'>&lt;/&gt;</button></a>
                  )}
                </li>

              </ul>

            {loginStatus && (localStorage.getItem("Usertype") === 'user') && (<NavLink to='/analysis' className='btn btn-white mr-2'>{localStorage.getItem("username")}</NavLink>)}
            <button className='btn btn-white mr-2'><i className="fa fa-home"></i></button>

            {/* <button className='btn btn-white  mr-2' onClick={() => setShow(!show)}><i className="fas fa-bell"></i></button> */}

            {/* <button className='btn btn-white  mr-2'><i className="fa fa-question" aria-hidden="true"></i></button> */}
            {/* <button className='btn btn-white mr-2'><i className="fa fa-trophy"></i></button> */}

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
      {
        show && (
          <div className="title1">
            <NotificationBox
              description="Here all notifications will be displayed."

              title="For Notifications" className="box"
            />
            {/* <textarea className="notification" type="text" placeholder="Add Your comment.." rows={10} cols={6}></textarea> */}
          </div>
        )
      }
    </div>
  )
}