import React from 'react'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

import './Register.css'
function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  const [state, setState] = useState(false);


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials.name);
    console.log(credentials.email);
    console.log(credentials.password);

    //   if(credentials.password != credentials.passwordConfirm){alert("re enter password")};
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ username: credentials.name, email: credentials.email, password: credentials.password })
      // body: JSON.stringify({email: credentials.email, password:credentials.password})

    });

    const json = await response.json();
    // console.log(json);
    // console.log(credentials.type);

    if (json.success) {

      setState(true);
      localStorage.setItem('username', json.username);

      //stroing date information for profile section..
      const month = new Map();
      month['01'] = "Jan";  month['02'] = "Feb";  month['03'] = "Mar";  month['04'] = "Apr";  month['05'] = "May";  month['06'] = "June";
      month['07'] = "July";  month['08'] = "Aug";  month['09'] = "Sep";  month['10'] = "Oct";  month['11'] = "Nov";  month['12'] = "Dec";
      
      const year = json.date.substring(0, 4);
      const mn = json.date.substring(5, 7);
      console.log(json.date.toLocaleString('default', { month: 'long' }));
      
      localStorage.setItem("since", month[mn]+" "+year);


      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 2000);
    }
    else {
      // alert("You are Not Registered");
      alert(json.error);
    }
  }

  return (
    <>
      <div style={{ marginTop: '80px' }}></div>
      {(
        () => {
          if (state === true) {

            return (<>
              <div class="alert alert-success alert-dismissible" role="alert" Style="background-color:green; color:white;">
                You are <strong>Successfully</strong> Registered!!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </>)

          }
        }
      )()}
      <div className="bg-img">
        <div className="contentR">
          <header style={{ color: 'black' }}>Register</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input type="text" name='name'
                onChange={onChange} required placeholder="Name" />
            </div>
            <div className="field space">
              <span className="fa fa-user"></span>
              <input type="email" name='email'
                onChange={onChange} required placeholder="Email " />

            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input type="password" name='password' onChange={onChange} className="pass-key" required placeholder="Password" />
            </div>

            <div className="pass">
              {/* <a href='/'>Forgot Password?</a> */}
            </div>
            <div className="field">
              <button type="submit"
                value="Register"  >Register</button>
            </div>
          </form>
          <div className="signup">Already Have Acount?
            <NavLink to="/login">Sigin Now</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;