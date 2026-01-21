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
                <h2 className="section-title">All Products</h2>

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
                                    className="h-100 border-0 shadow-soft"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <div className="position-relative overflow-hidden">
                                        <Card.Img
                                            variant="top"
                                            src={product.imageUrl || 'https://placehold.co/300x400?text=No+Image'}
                                            alt={product.name}
                                            style={{ height: '320px', objectFit: 'cover', transition: 'var(--transition-base)' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/300x400?text=No+Image";
                                            }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <h6 className="mb-1 fw-bold text-truncate">{product.name}</h6>
                                        <p className="small text-muted mb-3 text-truncate">{product.category}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className="fw-bold" style={{ color: 'var(--text-main)' }}>₹{product.price}</span>
                                            <Button
                                                className="btn-primary btn-sm rounded-pill px-3"
                                                onClick={(e) => handleAddToCart(e, product.id)}
                                            >
                                                Add
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
