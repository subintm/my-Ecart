import React from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/slices/wishlistSlice'
import Header from '../components/Header'

function WishList() {
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
  const dispatch=useDispatch(removeFromWishlist)
  return (
    <>
    <Header/>
    <div style={{ marginTop: '60px' }}>
      <Row className='container mt-5'>
       { wishlist.length>0?wishlist?.map(product=>( <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card classNameshadow rounded style={{ width: '18rem' }}>
            <Link to={'/view/1'}><Card.Img style={{ height: '180px' }} variant="top" src={product.thumbnail} /></Link>
            <Card.Body>
              <Card.Title>{product?.title}</Card.Title>
              <div className='d-flex justify-content-between'>
                <Button onClick={()=>dispatch(removeFromWishlist(product.id))} className='btn btn-light fs-5'><i className="fa-solid fa-heart-circle-minus text-danger"></i></Button>
                <Button className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        )): <div className='text-danger text-center mt-5 ms-5' >
          <img width={'25%'} height={'200px'} src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" alt="" />
          <h1 className='mt-3'> Empty Wishlist</h1>
          <Link to={'/'}> <div className='btn btn-danger border-0 '>go to home</div>
        </Link>
        </div>
        }
      </Row>
    </div>
    </>
  )
}

export default WishList