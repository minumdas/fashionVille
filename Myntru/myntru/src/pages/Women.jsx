import couponImg from "../coupon.png";
import Container from 'react-bootstrap/Container';
import WomenCaroussel from '../component/WomenCaroussel';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import AppNavbar from './Navbar';
import ShopForWomen from '../component/ShopForWomen';
import ProductList from '../component/ProductList';

const Women = () => {
  return (
    <>
      {/* NAVBAR */}
      <AppNavbar />

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
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-5">
          <h3 className="fw-bold mb-4 text-center">Featured Products</h3>
          <WomenCaroussel />
        </div>

        {/* Category Group */}
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-5">
          <h3 className="fw-bold mb-4 text-center">Grace in Every Style</h3>
          <ShopForWomen />
        </div>

        {/* Product List Section */}
        <ProductList category="WOMEN" />

      </Container>

      <Footer />
    </>
  )
}

export default Women