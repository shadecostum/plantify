import React from 'react';
import {  useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { auth} from '../../Firebase/Config'; 
import {signInWithEmailAndPassword} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
function Login() {
  const navi=useNavigate();

  // const navhome=()=>
  // {
  //   navi('/home')
  // }

  const navlog=()=>
{
  navi('/')
}
  const handleData= (e)=>
  {
      e.preventDefault();  

      signInWithEmailAndPassword(auth,emailS,passW).then((userCredential)=>
      {
        console.log(userCredential);
        
        navi('/home')
      }).catch((error)=>
      {
        console.log(error);
        alert(error.message)
      })
     
      
      
  }

 
  const [emailS, setEmail] = useState("")
  
  const [passW, setpassW] = useState("")

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleData}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder="akash777kk@gmail.com"
            value={emailS}
            onChange={(e)=>
              {
                setEmail(e.target.value)
              }} 
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={passW}
            onChange={(e)=>
              {
                setpassW(e.target.value)
              }}
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <button onClick={navlog}>Create an account</button>
      </div>
    </div>
  );
}

export default Login;
