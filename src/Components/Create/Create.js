import React, { useState,useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { auth } from '../../Firebase/Config';
import { db } from '../../Firebase/Config';
import { storage } from '../../Firebase/Config'; 
import { v4  } from 'uuid';
import {useNavigate} from 'react-router-dom'



import {
  collection,
  addDoc,
  
} from "firebase/firestore";

import {
  
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


// import { useFirestore } from "reactfire";

const Create = () => {

const [uName, setuName] = useState('')
const [category, setcategory] = useState('')
const [price, setprice] = useState('')
const [imagee, setimagee] = useState()
const [authuser, setauthuser] = useState('')
// const[quantity,setquantity]=useState('')
const date=new Date()
const navi=useNavigate();


useEffect(() => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const authId = currentUser.uid;
    setauthuser(authId)
  } else {
    console.log('No user is currently signed in.');
  }
},[])
const uploadfile=()=>
{
  if(imagee ==null) return;            //name of image upload in file v4==uuid npm install
  
  
  const imgRef=ref(storage,`/image/${imagee.name +v4()}`);
  uploadBytes(imgRef,imagee).then(()=>
  {
    getDownloadURL(imgRef).then((url)=>
    {
      console.log(url);
      const fireConnect =collection(db,"products")
      addDoc(fireConnect,{
        name:uName,
        category:category,
        price:price,
        // quantity:quantity,
        url:url,
        id:authuser,
        createdate:date.toDateString()
      })

    })
  })
  navi('/home')
}





  return (
    // <Fragment>
    <div>
      <Header/>
      <card>
        <div className="centerDiv">
          <form >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder='akash'
              value={uName}
              onChange={(e)=>{setuName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder='type'
              value={category} 
              onChange={(e)=>{setcategory(e.target.value)}}
            />
             <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
            value={price}
            onChange={(e)=>
            {
              setprice(e.target.value)
            }}
             />
             <br/>
            {/* <label htmlFor="dfname">Quantity</label>
            <br />
            <br /> */}
             {/* <input className="input" type="number" id="fname" name="Quantity" 
            value={quantity}
            onChange={(e)=>
            {
              setquantity(e.target.value)
            }}
            /> */}
            <br />
          </form>
          <br />

       <img alt="Posts" width="200px" height="200px" src={imagee ? URL.createObjectURL(imagee) : ''}></img>
          
            <br />
       <input type="file" onChange={(e)=>
          {
            setimagee(e.target.files[0])
          }} />
            <br />
      <button className="uploadBtn" onClick={uploadfile}>upload and Submit</button>
          
        </div>
      </card>
      </div>
    // </Fragment>
  );
 }
export default Create;





