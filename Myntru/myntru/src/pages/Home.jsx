import React from 'react';
import couponImg from "../coupon.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Caroussel from '../component/Caroussel';
import HomeCard from '../component/Homecard';
import logoVille from '../WearVille.jpg';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import Shopbycategory from '../component/Shopbycategory';

const Home = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm border-bottom">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img src={logoVille} style={{ height: '60px', marginRight: '10px' }} alt="Logo" />
            <span className="fw-bold h5 mb-0">WearVille</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#men" className="mx-2 fw-semibold">Men</Nav.Link>
              <Nav.Link href="#women" className="mx-2 fw-semibold">Women</Nav.Link>
              <Nav.Link href="#kids" className="mx-2 fw-semibold">Kids</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MAIN CONTENT */}
      <Container className="my-5">

        {/* COUPON CARD */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="text-center">
            <h2 className="fw-bold mb-3">Exclusive Offer!</h2>
            <p className="text-muted mb-4">Use the coupon below and get amazing discounts</p>
            <img
              src={couponImg}
              alt="Coupon"
              className="img-fluid mb-3 rounded-3 shadow-sm"
              style={{ maxHeight: '200px' }}
            />
            <div>
              <Button variant="danger" size="lg" className="fw-bold px-4 btn-coupon">Copy Code: SAVE20</Button>
            </div>
          </div>
        </div>

        {/* CAROUSEL SECTION */}
        <div className="card shadow-sm border-0 rounded-4 p-3">
          <h3 className="fw-bold mb-4 text-center">Featured Products</h3>
          <Caroussel />
        </div>
       <div className="card shadow-sm border-0 rounded-4 p-3">
          <h3 className="fw-bold mb-4 text-center">New Arrivals</h3>
          <HomeCard/>
       </div>

       {/* Card Group */}
       <div className="card shadow-sm border-0 rounded-4 p-3">
          <h3 className="fw-bold mb-4 text-center">Shop by Category</h3>
          <Shopbycategory  />

       </div>

      </Container>

     <Footer/>
    </>
  );
}

export default Home;