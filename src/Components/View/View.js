import React from 'react';
import { useState,useEffect } from 'react';

import './View.css';
// import { postContext } from '../../Store/postContext';
import { db } from '../../Firebase/Config';
import {collection,query,where} from 'firebase/firestore'


function View() {

const [userDetails, setuserDetails] = useState([])
// const {postDetails}=useContext(postContext)

useEffect(()=>
{     
  const fireconnect=collection(db,'users')
  const q=query(fireconnect,where('id','==',userid)); 
  const data = getDocs(q);
  setuserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

})


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}r</p>
          <span>{postDetails.createdate}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails.name}</p>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
