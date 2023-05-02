import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { auth, db } from '../../Firebase/Config'; 
import {collection, getDocs,doc,deleteDoc} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from '@material-ui/core';

// import { useNavigate } from 'react-router-dom';

function Posts() {
  // const navi=useNavigate()
  const [Product, setProduct] = useState([])

  const [authuser, setauthuser] = useState('')
  
  useEffect(() => {
    
    
    
    const connectw=collection(db,"products")

    const fetchData = async  () => {
      const data =  await getDocs(connectw);
      console.log(data);
     const newdata= data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
     console.log(newdata);
     setProduct(newdata)
    };
    fetchData();
    
  }, [])


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

  

  const handleDeleteProduct =async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
    window.location.reload();
  };


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Vegetables and Seeds available</span>
          <span>Scroll right</span>
        </div>
        <div className="cards">
        {Product.map((obj)=>
        {return(
          <div className="card"    >

            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={obj.url} alt="" />
            </div>
            <div className="contente">
              <p className="rate">&#x20B9;Price:  
              {obj.price}</p>
              <span className="kilometer">Category:  {obj.category}</span>
              <p className="name"> Name:  {obj.name}</p>
              {/* <p className='name'>Quantity:  {obj.quantity}</p> */}
            </div>
            <div className="date">
              <span>{obj.createdate}</span>
            </div>
            {authuser ?
            <Button onClick={() => handleDeleteProduct(obj.id)}> Delete </Button>: null}
          </div>
          
        )

        })
          
}
        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
