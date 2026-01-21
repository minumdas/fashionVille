import React from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './Navbar';
import Footer from './Footer';

const Cart = () => {
    const { cart, loading, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    if (loading) return (
        <>
            <AppNavbar />
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading your cart...</p>
            </Container>
            <Footer />
        </>
    );

    return (
        <>
            <AppNavbar />
            <Container className="py-5" style={{ minHeight: '70vh' }}>
                <h2 className="section-title">Your Shopping Cart</h2>

                {cart.items.length === 0 ? (
                    <div className="text-center py-5 border rounded bg-white shadow-soft">
                        <h4 className="text-muted">Your cart is empty</h4>
                        <Button className="btn-primary mt-3" onClick={() => navigate('/products')}>
                            Go Shopping
                        </Button>
                    </div>
                ) : (
                    <Row>
                        <Col lg={8}>
                            <Card className="border-0 shadow-soft mb-4">
                                <Card.Body className="p-0">
                                    <Table hover responsive className="mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="border-0 p-3">Product</th>
                                                <th className="border-0 p-3 text-center">Price</th>
                                                <th className="border-0 p-3 text-center">Quantity</th>
                                                <th className="border-0 p-3 text-center">Total</th>
                                                <th className="border-0 p-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="p-3 align-middle">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={item.product.imageUrl || 'https://placehold.co/100x100?text=No+Image'}
                                                                alt={item.product.name}
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                                className="rounded me-3"
                                                            />
                                                            <div>
                                                                <h6 className="mb-0 fw-bold">{item.product.name}</h6>
                                                                <small className="text-muted">{item.product.category}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 align-middle text-center">₹{item.product.price}</td>
                                                    <td className="p-3 align-middle text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                className="px-2 py-0"
                                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="mx-3 fw-bold">{item.quantity}</span>
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                className="px-2 py-0"
                                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 align-middle text-center fw-bold">₹{item.product.price * item.quantity}</td>
                                                    <td className="p-3 align-middle text-center">
                                                        <Button
                                                            variant="link"
                                                            className="text-danger p-0 border-0"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <div className="d-flex justify-content-between">
                                <Button variant="outline-danger" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                                <Button variant="outline-primary" onClick={() => navigate('/products')}>
                                    Continue Shopping
                                </Button>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <Card className="border-0 shadow-soft">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">Order Summary</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal</span>
                                        <span>₹{calculateTotal()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Shipping</span>
                                        <span className="text-success">FREE</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="fw-bold">Total</h5>
                                        <h5 className="fw-bold" style={{ color: 'var(--primary)' }}>₹{calculateTotal()}</h5>
                                    </div>
                                    <div className="d-grid">
                                        <Button className="btn-primary btn-lg" onClick={() => alert('Proceeding to checkout (Coming Soon!)')}>
                                            Checkout Now
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Cart;
