import React from 'react';
import couponImg from "../coupon.png";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Footer from '../pages/Footer';
import AppNavbar from '../pages/Navbar';
import KidsCaroussel from '../component/KidsCaroussel';
import ShopForKids from '../component/Shopforkids';
import ProductList from '../component/ProductList';

const Kids = () => {
    return (
        <>
            <AppNavbar />
            <Container className="my-5">
                {/* COUPON CARD */}
                <div className="card shadow-sm border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: '#f0f9ff' }}>
                    <div className="text-center">
                        <h2 className="fw-bold mb-3" style={{ color: '#0ea5e9' }}>Special Kids Offer!</h2>
                        <p className="text-muted mb-4">Get the best for your little ones with extra savings.</p>
                        <img
                            src={couponImg}
                            alt="Coupon"
                            className="img-fluid mb-3 rounded-3 shadow-sm"
                            style={{ maxHeight: '200px' }}
                        />
                        <div>
                            <Button variant="info" size="lg" className="fw-bold px-4 text-white">
                                Copy Code: KIDS30
                            </Button>
                        </div>
                    </div>
                </div>

                {/* CAROUSEL SECTION */}
                <div className="card shadow-sm border-0 rounded-4 p-3 mb-5">
                    <h3 className="fw-bold mb-4 text-center">Kids' Favorites</h3>
                    <KidsCaroussel />
                </div>

                {/* Category Group */}
                <div className="card shadow-sm border-0 rounded-4 p-3 mb-5">
                    <h3 className="fw-bold mb-4 text-center">Shop by Category</h3>
                    <ShopForKids />
                </div>

                {/* Product List Section */}
                <ProductList category="KIDS" />
            </Container>
            <Footer />
        </>
    );
}

export default Kids;
