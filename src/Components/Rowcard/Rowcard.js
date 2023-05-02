import React, { useEffect, useState } from 'react'
import './Rowcard.css'
import axios from '../Constents/Axios'
import { img_url } from '../Constents/Conste'
// import Youtube from 'react-youtube'
import { Api_Key } from '../Constents/Conste'
function Rowcard(props) {

  const [movie, setmovie] = useState([])
  const [url, seturl] = useState('')

  const handleid=(id)=>
  {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${Api_Key}&language=en-US`).then(responce=>
    {
        console.log(responce.data);
        if(responce.data.results.length!==0)
        { 
          seturl(responce.data.results[0])

        }
        else{
          console.log('empty');
        }
    })
  };
  
   

  useEffect(() => {
    
  axios.get(props.url).then((responce)=>
  { console.log(responce.data);
    setmovie(responce.data.results)
  })
   
  }, [])

  // const opts = {
  //   height: '390',
  //   width: '100%',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

    return (
        <div className='row'>
            <h2 style={{color:'red'}}>{props.title}</h2>
            <div className='posters'>
                {movie.map((obj,index)=>
                {
                    
                    return(   
                        <img onClick={()=>
                        {
                            handleid(obj.id)
                        }
                    }   className={props.isSmall ? 'smallPoster' : 'poster'} alt='poster' src= {`${img_url+obj.backdrop_path}`}/>
                       
                    )
                })}
               
               </div>
                     
               {/* {url ? <Youtube opts={opts} videoId={url.key} /> : null} */}

        </div>
    )
}

export default Rowcard

