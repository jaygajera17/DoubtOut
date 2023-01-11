import { useState } from 'react'
// import { countDocuments } from '../../../Backend/models/userModel'
import  './Login.css'

import { useEffect } from 'react'
 function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  
  const isLoggedin=()=>{
    if(localStorage.getItem('user')){
      return true
    }
    else{
      return false
    }
  }
	
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
    
      console.log(json);
      console.log(json.success);
      if (json.success) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', json.user);
        localStorage.setItem('email', json.email);
        alert('Login successful');
      }
      else{
        alert('Invalid Credentials');
      }
  }
  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log(credentials.email);
    console.log(credentials.password);
}

  useEffect(() => {
    isLoggedin();
  }, [])

	return (
		<div>
        <div style={{marginTop:'80px'}}>
    {/* <Heading/> */}

  </div>	
  
  <body>
    <div className="bg-img">
      <div className="content">
        <header style={{color:'black'}}>Login Form</header>
        <form onSubmit={handleSubmit} method='post'>
          <div className="field">
            <span className="fa fa-user"></span>
            <input type="email" onChange={onChange} name='email' required placeholder="Email or username"/>
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input type="password" onChange={onChange} name='password' className="pass-key" required placeholder="Password"/>
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