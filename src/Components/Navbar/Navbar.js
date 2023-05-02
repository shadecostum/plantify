import React from 'react'
import "./Navbar.css";
import imagee from '../../lo.png'
function Navbar() {
    return (
        <div className="navbar" >
            <img className="logo" src={imagee}/>
           
        </div>
    )
}

export default Navbar