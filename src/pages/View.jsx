import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/slices/wishlistSlice'
import Header from '../components/Header'
import { addtoCart } from '../Redux/slices/cartSlice'





function View() {
const{id}=useParams()
const{loading,products,error}=useSelector((state)=>state.productSlice)
const {wishlist}=useSelector(state=>state.wishlistSlice)
const[product,setProduct]=useState({})
const dispatch =useDispatch()
  useEffect(()=>{
    setProduct(products.find(product=>product.id==id))

  },[])
  const handleWishlist=(products)=>{
    const existingProduct=wishlist.find(item=>item.id==products.id)

    if(existingProduct){
      alert("product already exist")
    }else{
      dispatch(addToWishlist(products))
    }
  
    }
  console.log(product);
 
  return (
    <>
    <Header/>
    <div className='container mt-5'>{
      loading ? <div className='d-flex justify-content-center mt-5'> <Spinner animation='border' variant='danger' /> Loading... </div> :
    
      <div className="row mt-5 align-items-center">
        <div className="col-md-4">
          <img style={{ height: '250px', width: '250px',margin:'40px' }} src={product?.thumbnail} alt="product" />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <p style={{fontSize:'15px'}}>P(ID): {product?.id}</p>
          <h1 style={{fontSize:'25px'}}>{product?.title}</h1>
          <h5  style={{fontSize:'17px'}}className='fw-bolder'>{product?.price}</h5>
          <p style={{ textAlign: 'justify',fontSize:'13px' }}><span style={{fontSize:'1px'}} className='fw-bolder'>Description:</span >{product?.description}</p>
          <div className='d-flex justify-content mt-5 '>
            <Button  onClick={()=>handleWishlist(product)} variant="outline-dark" className='btn fs-5 me-2' 
            style={{backgroundColor:'orange', border:'3', borderRadius:'5px'}}><i className="fa-solid fa-heart text-danger"></i> Add to Wishlist</Button>
            <Button   onClick={()=> dispatch(addtoCart(product))}  variant="outline-dark" className='btn fs-5'
             style={{backgroundColor:'red', border:'3', borderRadius:'5px'}}><i className="fa-solid fa-cart-plus text-success"></i>Cart</Button>
          </div>
        </div>
      </div>
}
    </div>
    </>
  )
}

export default View