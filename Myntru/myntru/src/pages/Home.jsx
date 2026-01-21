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
import AppNavbar from './Navbar';

const Home = () => {
  return (
    <>
      {/* NAVBAR */}
      <AppNavbar />

      {/* MAIN CONTENT */}
      <Container className="my-5">

        {/* COUPON CARD */}
        <div className="card shadow-soft border-0 p-5 mb-5 text-center" style={{ background: 'var(--primary-light)' }}>
          <div className="mx-auto" style={{ maxWidth: '600px' }}>
            <h2 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Exclusive Offer!</h2>
            <p className="text-muted mb-4">Elevate your style with our latest collection and enjoy special savings.</p>
            <img
              src={couponImg}
              alt="Coupon"
              className="img-fluid mb-4 rounded-3 shadow-sm"
              style={{ maxHeight: '200px' }}
            />
            <div>
              <Button className="btn-primary">Copy Code: SAVE20</Button>
            </div>
          </div>
        </div>

        {/* CAROUSEL SECTION */}
        <div className="mb-5">
          <h3 className="section-title">Featured Products</h3>
          <Caroussel />
        </div>

        <div className="mb-5">
          <h3 className="section-title">New Arrivals</h3>
          <HomeCard />
        </div>

        {/* Categories section */}
        <div className="mb-5">
          <h3 className="section-title">Shop by Category</h3>
          <Shopbycategory />
        </div>

      </Container>

      <Footer />
    </>
  );
}

export default Home;