import { useState } from 'react'
// import { countDocuments } from '../../../Backend/models/userModel'
import './Login.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [state, setState] = useState(false);

  // const isLoggedin = () => {
  //   if (localStorage.getItem('username')) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()

    if (json.success != null) {
      setState(true);
      window.scrollTo(0, 0);
      
      localStorage.setItem("username", json.username);

      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 2000);
    }
    else {
      alert('Invalid Credentials');
    }
  }
  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  
  }

  useEffect(() => {
    // isLoggedin();
  }, [state])

  return (

    <div>
      
      <div style={{ marginTop: '80px' }}>
        
      {(
        () => {
          if (state === true) {

            return (<>
              <div class="alert alert-success alert-dismissible" role="alert" Style="background-color:green; color:white;">
                You are <strong>Successfully</strong> logged in!!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </>)

          }
        }
      )()}
        {/* <Heading/> */}

      </div>

      <body>
     
            <div className="bg-img">

          <div className="content">
           
            <header style={{ color: 'black' }}> Login</header>
            <form onSubmit={handleSubmit} method='post'>
              <div className="field">
                <span className="fa fa-user"></span>
                <input type="email" onChange={onChange} name='email' required placeholder="Email or username" />
              </div>
              <div className="field space">
                <span className="fa fa-lock"></span>
                <input type="password" onChange={onChange} name='password' className="pass-key" required placeholder="Password" />
              </div>
              <div className="pass">
                <p>Forgot Password?</p>
              </div>
              <div className="field">
                <button type="submit"
                  value="Login"  >Login </button>
              </div>
            </form>
            <div className="signup">Don't have account?
              <a href="/">Signup Now</a>
            </div>
          </div>
        </div>




      </body>





    </div>

  )
}

export default Login