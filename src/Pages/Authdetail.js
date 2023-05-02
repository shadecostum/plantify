import React from 'react'
import {onAuthStateChanged,signOut} from 'firebase/auth'
import { auth } from '../Firebase/Config'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Authdetail() {
const [authuser, setauthuser] = useState('')


useEffect(() => {
  const listen = onAuthStateChanged(auth,(user)=>
  {
   
     if (user) {
      setauthuser(user)
    }
    else
    {   
        setauthuser(null)

    }

  })


  return () => {
    listen();
  }
}, [])



// useEffect(()=>
// {
//   const listenn = onAuthStateChanged(auth,(user)=>
//   {
//     if()
//     {
//       setaauthuser(user)
//     }
//   })
// })



const navi=useNavigate();
const navlog=()=>
{
  navi('/')
}

    const btnsighnout=()=>
    {
        signOut(auth).then(()=>
        {
            console.log("succes");
            window.location.reload();
        }).catch(error=>
            {
                console.log(error);
            })
    }


  return (
   
    <div >
   
      
        {authuser ? <div style={{display:'flex',  margin: '10px',marginRight:'60px'}} ><p style={{color:'whitesmoke',    marginRight:'25px'}}>{`${authuser.email }`}</p><Button variant="contained" color="primary"onClick={btnsighnout} >SighnOut</Button> </div>: <Button variant="contained" color="primary"style={{right:'55px'}} onClick={navlog}>Login</Button>}
       
        
    
    
       
    </div>
  )
}

export default Authdetail
