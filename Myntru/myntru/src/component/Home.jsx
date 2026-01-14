import React from 'react'
import couponImg from "../coupon.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Caroussel from './Caroussel';


const Home = () => {
  return (
    <div className='card'>
      <div className='card-body'>
      <Navbar bg="light" variant="light" sticky="top" className="border-bottom">
      <Container>
        <Navbar.Brand href="#home">Myntru</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#men">Men</Nav.Link>
          <Nav.Link href="#women">Women</Nav.Link>
          <Nav.Link href="#kids">Kids</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
     <div  className="my-4 ">
         <img src={couponImg} alt="coupon image" className="coupon-img" />
      </div> 
    <div  className="my-4">
      <Caroussel/>
     
     </div>
     </div>
    </div>
  )
}

export default Home