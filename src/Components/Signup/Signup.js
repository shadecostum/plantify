import React, {  useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
// import { firebaseContext } from '../../Store/FirebaseContext';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { addDoc, collection  } from 'firebase/firestore';

import { db } from '../../Firebase/Config';
import { useNavigate } from 'react-router-dom';
import { auth} from '../../Firebase/Config'; 


export default function Signup() {

  const [userName, setuserName] = useState("")
  const [emailS, setEmail] = useState("")
  const [phoneN, setphoneN] = useState("")
  const [passW, setpassW] = useState("")
  const [uuid,setuuid]= useState({id:""})
  // const [checkLog, setcheckLog] = useState([])

  // const {auth} = useContext(firebaseContext);
//  const collectionRef=collection(db,"userss");


const navi=useNavigate();
const alredy=()=>
{
  navi('/login')
}

  const handleData = (e)=>
  {
   
      e.preventDefault();  

     createUserWithEmailAndPassword(auth,emailS,passW).then((userCredential)=>
     {
       console.log(userCredential);
       navi('/login')
       const uid = userCredential.user.uid;
       setuuid({
        id:uid
      });
       console.log(uuid);
       const userRef = collection(db, 'users')
       addDoc(userRef, {name:userName,email:emailS,phone:phoneN,id:uid})
       }).catch(error=>
        {
          console.log(error.message);
          alert(error.message)
        })

      
      
     
        
  }
  return (

    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="" ></img>
        <form onSubmit={handleData}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder='akash'
            value={userName}
            onChange={(e)=>
            {
              setuserName(e.target.value)
            }}  
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phoneN}
            onChange={(e)=>
              {
                setphoneN(e.target.value)
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
            defaultValue="Doe"
            value={passW}
            onChange={(e)=>
              {
                setpassW(e.target.value)
              }}
          />
          
          <br />
          <br />
          
          <button>Signup</button>
        
        </form>
     <button onClick={alredy}>Alredy have account</button>
      </div>
    </div>
  );
 
}


