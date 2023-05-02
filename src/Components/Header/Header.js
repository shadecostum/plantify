import React, { useEffect, useState } from 'react';

import './Header.css';
import Logo from '../../olx-logo.png';

import Search from '../../assets/Search';
// import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import Authdetail from '../../Pages/Authdetail';
import {useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/Config'
function Header() {
  const navi=useNavigate();
  const sell=()=>
  {
    navi('/create')
  }
  const [authuser, setauthuser] = useState('')

  useEffect(() => {
    const listen = onAuthStateChanged(auth,(user)=>
    {
     
       if (user.email==="aaaaa@gmail.com") {
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

  

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
        <img width="70px" height="50px" src={Logo} alt="" ></img>
        </div>
        {/* <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div> */}
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="search a plant name here......"
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

        
        {authuser ? <div className="sellMenu" onClick={sell}>
          <SellButton ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>ADD POST</span>
          </div>
        </div> : null}


        
        <div className="loginPage">
          <span><Authdetail/></span>
          <hr />
        </div>

        
      </div>
    </div>
  );
}

export default Header;
