import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getAllProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AppNavbar from './Navbar';
import Footer from './Footer';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllProducts();
                console.log('[AllProducts] Setting products:', data);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error('[AllProducts] Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (e, productId) => {
        e.stopPropagation();
        const result = await addToCart(productId, 1);
        if (result.success) {
            alert('Added to cart!');
        } else {
            alert(`Failed to add to cart: ${result.error || 'Please check your connection.'}`);
        }
    };

    return (
        <>
            <AppNavbar />
            <Container className="my-5">
                <h2 className="mb-4 text-center fw-bold">All Products</h2>

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <Row>
                        {products.map((product) => (
                            <Col key={product.id} md={3} className="mb-4">
                                <Card
                                    className="h-100 shadow-sm border-0 product-card"
                                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={product.imageUrl || 'https://placehold.co/300x400?text=No+Image'}
                                        alt={product.name}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body className="text-center d-flex flex-column">
                                        <Card.Title className="fs-6 fw-bold">{product.name}</Card.Title>
                                        <Card.Text className="text-muted small mb-1">{product.category}</Card.Text>
                                        <Card.Text className="fw-bold text-primary mb-3">₹{product.price}</Card.Text>
                                        <div className="mt-auto d-grid gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={(e) => handleAddToCart(e, product.id)}
                                            >
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/product/${product.id}`);
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                        {products.length === 0 && (
                            <Col xs={12}>
                                <div className="text-center py-5">
                                    <p className="text-muted">No products available.</p>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default AllProducts;
