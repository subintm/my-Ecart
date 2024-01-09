import React, { useEffect } from 'react'
import { Col, Row, Card, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, onNavigateNext, onNavigatePrev} from '../Redux/slices/productSlice'
import { addToWishlist } from '../Redux/slices/wishlistSlice'
import { addtoCart } from '../Redux/slices/cartSlice'
import Header from '../components/Header'







function Home() {
  const dispatch = useDispatch()
  const { loading, products, error,productPerPage,currentPage } = useSelector((state) => state.productSlice)
  const {wishlist}=useSelector(state=>state.wishlistSlice)
const totalPages=Math.ceil(products?.length/productPerPage)
const indexOfLastItem=currentPage* productPerPage
const indexOfFirstItem=indexOfLastItem-productPerPage
const visibleCards =products?.slice(indexOfFirstItem,indexOfLastItem)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const handleWishlist=(products)=>{
  const existingProduct=wishlist.find(item=>item.id==products.id)
  if(existingProduct){
    alert("product already exist")
  }else{
    dispatch(addToWishlist(products))
  }

  }

  const NavigatePrev=()=>{
   if(currentPage!=1){
    dispatch(onNavigatePrev())
   }
  }
  const NavigateNext=()=>{
    if(currentPage!=totalPages){
     dispatch(onNavigateNext())
    }
   }

  return (
    <>
    <Header insideHome/>
    <div style={{ marginTop: '60px', margin:'100px'}}>
     
      {
        !loading&&error ?<div className='mt-5 text-center text-danger fw-bolder'>{error}</div>:null
      }
      {
        loading ? <div className='d-flex justify-content-center mt-5'> <Spinner animation='border' variant='danger' /> Loading... </div> :

          <Row className='container mt-5'>
            {products.length >0?visibleCards.map((products, index) => (
              <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                <Card classNameshadow rounded style={{ width: '13rem '}}>
                  <Link to={`/view/${products.id}`}><Card.Img style={{ height: '120px' }} variant="top" src={products.thumbnail} /></Link>
                  <Card.Body>
                    <Card.Title style={{fontSize:'15px'}}>{products.title.slice(0, 20)}...</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <Button onClick={()=>handleWishlist(products)} className='btn btn-light fs-5'><i className="fa-solid fa-heart text-danger"></i></Button>
                      <Button onClick={()=> dispatch(addtoCart(products))} className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )): !error&&<div className='mt-5 text-center'>
            <img style={{width:'50%'}}  src="https://tampcol.com/public/assets/images/product_not_found2.png" alt="" />
            </div>
          }

          <div className='d-flex justify-content-center align-items-center'>
            <span onClick={NavigatePrev} className='btn btn-link'><i class="fa-solid fa-angles-left text-dark fw-bolder"></i></span>
            <span style={{fontWeight:'bolder'}}>{currentPage}of{totalPages}</span>
            <span  onClick={NavigateNext} className='btn btn-link'><i class="fa-solid fa-angles-right text-dark fw-bolder"></i></span>

          </div>
          </Row>
      }
    </div>
    </>
  )
}

export default Home