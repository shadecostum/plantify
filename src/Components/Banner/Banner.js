import React, { useState } from 'react'
import './Banner.css'
import axios from '../Constents/Axios'
import {Api_Key} from '../Constents/Conste'
import { useEffect } from 'react'

function Banner() {
  const [movie, setmovie] = useState([])
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${Api_Key}&language=en-US`).then((responce)=>
    { 
      console.log(responce.data.results[0] );
      setmovie(responce.data.results[1]);
    })
  }, [])

    return (
        <div s
         className='banner'>
            <div className='content' >
                <h1 className='title'>Plant disease and dignosis</h1>
                {/* <div className='banner_buttons' >
                    <button className='button' >Play</button>
                    <button className='button' >My list</button>
                </div> */}
                <h1 className='description'>skbhdcskhbckhbdfcsbcsdcsdkcbdskcbdkcbdbkcbdkcbkcbskcbdshcbkhcbdskcbskcbsdkcbsdkcbdskcbscdscscs snckjbcksdcskcsdkjcb</h1>
            </div>
        <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner