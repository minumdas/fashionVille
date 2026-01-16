import couponImg from "../coupon.png";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';
import AppNavbar from './Navbar';
import MenCaroussel from '../component/MenCaroussel';

const Men = () => {
  return (
    <>
      {/* NAVBAR */}
      <AppNavbar/>

      {/* MAIN CONTENT */}
      <Container className="my-5">

        {/* COUPON CARD */}
      <div className="card shadow-sm border-0 rounded-4 p-4 mb-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <h2 className="fw-bold mb-3">Limited-Time Men’s Offer</h2>
          <p className="text-muted mb-4">Use the coupon below and get amazing discounts</p>
          <img
            src={couponImg}
            alt="Coupon"
            className="img-fluid mb-3 rounded-3 shadow-sm"
            style={{ maxHeight: '200px' }}
          />
          <div>
            <Button variant="danger" size="lg" className="fw-bold px-4 btn-coupon">
              Copy Code: SAVE20
            </Button>
          </div>
        </div>
      </div>

      {/* CAROUSEL SECTION */}
      <div className="card shadow-sm border-0 rounded-4 p-3">
        <h3 className="fw-bold mb-4 text-center">Trending in Men’s Fashion</h3>
        <MenCaroussel />
      </div>

      {/* Card Group */}
      <div className="card shadow-sm border-0 rounded-4 p-3">
        <h3 className="fw-bold mb-4 text-center">The Gentleman’s Edit</h3>
        <Shopformen />
      </div>


      </Container>

     <Footer/>
    </>
  );
}

export default Men;