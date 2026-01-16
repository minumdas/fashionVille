import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // optional, very minimal

const Footer = () => {
  return (
    <footer className="bg-light pt-5 mt-5">
      <div className="container">

        {/* TOP LINKS */}
        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">ONLINE SHOPPING</h6>
            <ul className="list-unstyled footer-links">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Home</li>
             
            </ul>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">USEFUL LINKS</h6>
            <ul className="list-unstyled footer-links">
              <li>Blog</li>
              <li>Careers</li>
              <li>Site Map</li>
              <li>Corporate Information</li>
              <li>Partner Brands</li>
              <li>Global</li>
            </ul>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">CUSTOMER POLICIES</h6>
            <ul className="list-unstyled footer-links">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>T&C</li>
              <li>Terms Of Use</li>
              <li>Track Orders</li>
              <li>Shipping</li>
              <li>Cancellation</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <h6 className="fw-bold">KEEP IN TOUCH</h6>
            <p className="mb-1">📘 Facebook</p>
            <p className="mb-1">📸 Instagram</p>
            <p className="mb-1">🐦 Twitter</p>
          </div>
        </div>

        {/* GUARANTEE */}
        <div className="row border-top pt-3">
          <div className="col-md-6">
            <p className="mb-1 fw-semibold">
              ✔ 100% ORIGINAL guarantee for all products at wearville.com
            </p>
          </div>
          <div className="col-md-6">
            <p className="mb-1 fw-semibold">
              ✔ Return within 14 days of receiving your order
            </p>
          </div>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="row mt-4">
          <div className="col-12">
            <h6 className="fw-bold">POPULAR SEARCHES</h6>
            <p className="small text-muted">
              Dresses | T-Shirts | Shoes | Watches | Kurtis | Sarees | Jeans |
              Sneakers | Handbags | Makeup | Kids Wear | Jackets | Accessories
            </p>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="row border-top mt-4 pt-3">
          <div className="col-md-8 small">
            <p className="mb-1">
              © 2026 www.wearville.com. All rights reserved.
            </p>
            <p className="mb-1">A Fashion E-Commerce Company</p>

            <p className="mb-0">
              <strong>Registered Office Address:</strong><br />
              WearVille Pvt Ltd, Tech Park,<br />
              Outer Ring Road, Bengaluru – 560103, India<br />
              CIN: W12345KA2026PTC000001<br />
              Telephone: +91-80-61561999
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
