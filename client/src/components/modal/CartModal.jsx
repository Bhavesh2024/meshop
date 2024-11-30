import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CartProduct from '../product/CartProduct'
const CartModal = () => {

  const [cartData,setCartData] = useState({
    username:'',
    cart:[],
  })
  const username = localStorage.getItem('user');
  const fetchCartData = async() =>{
    try{
      const response = await axios.get(`https://meshop-hx32.onrender.com/api/users/${username}/cart`);

      if(response.status == 200){
          console.log(response.data);
          setCartData(response.data);
      }
    }catch(error){
      console.log(error); 
    }

  }
  useEffect(()=>{
    fetchCartData()
  },[])

  if(username == '') return <div>No User Found</div>;
  if(!cartData) return <div>No Products</div>
  return (
    <div className='h-fit p-3 bg-white w-screen md:w-full'>
      <div className='flex flex-col gap-4 px-3'>
      {
        cartData.cart.length != 0 ? cartData.cart.map((value,key) => (
          <>
           <CartProduct productId={value}/>
          </>
        )) : <>
         <div> No Products Added to Cart</div>
        </>
      }
      </div>
    </div>
  )
}

export default CartModal
