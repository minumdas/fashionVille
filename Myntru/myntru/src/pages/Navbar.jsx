import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import logoVille from "../WearVille.jpg";
import "./Navbar.css";

const AppNavbar = () => {
  const menus = [
    {
      title: "Men",
      link: "/men",
      columns: [
        { heading: "Topwear", items: ["T-Shirts", "Shirts", "Casual Shirts", "Formal Shirts", "Jackets"] },
        { heading: "Bottomwear", items: ["Jeans", "Trousers", "Shorts", "Track Pants"] },
        { heading: "Footwear", items: ["Casual Shoes", "Sports Shoes", "Sandals", "Formal Shoes"] },
        { heading: "Accessories", items: ["Watches", "Belts", "Wallets", "Sunglasses"] },
      ],
    },
    {
      title: "Women",
      link: "/women",
      columns: [
        { heading: "Indian Wear", items: ["Kurtis", "Sarees", "Lehengas", "Salwar Suits"] },
        { heading: "Western Wear", items: ["Dresses", "Tops", "Jeans", "Skirts"] },
        { heading: "Footwear", items: ["Flats", "Heels", "Boots", "Sports Shoes"] },
        { heading: "Accessories", items: ["Handbags", "Jewellery", "Watches", "Sunglasses"] },
      ],
    },
    {
      title: "Kids",
      link: "/kids",
      columns: [
        { heading: "Boys", items: ["T-Shirts", "Jeans", "Ethnic Wear", "Shorts"] },
        { heading: "Girls", items: ["Dresses", "Skirts", "Tops", "Ethnic Wear"] },
        { heading: "Footwear", items: ["Casual Shoes", "Sports Shoes", "Sandals"] },
        { heading: "Toys & Games", items: ["Soft Toys", "Action Figures", "Board Games"] },
      ],
    },
  ];

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm border-bottom">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logoVille} alt="WearVille" height="55" />
          <span className="fw-bold ms-2">WearVille</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT MENU with Dropdowns */}
          <Nav className="me-auto align-items-center">
            {menus.map((menu) => (
              <div className="nav-menu-item" key={menu.title}>
                <Link to={menu.link} className="nav-menu-link">{menu.title}</Link>
                <div className="mega-menu">
                  <Row>
                    {menu.columns.map((col, idx) => (
                      <Col key={idx} className="mega-menu-col">
                        <h6>{col.heading}</h6>
                        <ul>
                          {col.items.map((item, i) => (
                            <li key={i}><Link to={`${menu.link}/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Link></li>
                          ))}
                        </ul>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            ))}

          </Nav>

          {/* RIGHT ICONS */}
          <Nav className="ms-auto text-center icon-nav">
            <Nav.Link as={Link} to="/profile" className="icon-link">
              <PersonOutlineIcon />
              <div className="small">Profile</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist" className="icon-link">
              <FavoriteBorderIcon />
              <div className="small">Wishlist</div>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="icon-link">
              <ShoppingBagOutlinedIcon />
              <div className="small">Cart</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
