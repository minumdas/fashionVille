import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { getProductById } from '../utils/api';
import { useCart } from '../context/CartContext';
import AppNavbar from './Navbar';
import Footer from './Footer';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                if (data) {
                    setProduct(data);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const result = await addToCart(product.id, quantity);
        if (result.success) {
            setAdded(true);
            setTimeout(() => setAdded(false), 3000);
        } else {
            alert(`Failed to add product: ${result.error || 'Please make sure you are logged in.'}`);
        }
    };

    if (loading) return (
        <>
            <AppNavbar />
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
            <Footer />
        </>
    );

    if (error) return (
        <>
            <AppNavbar />
            <Container className="py-5 text-center">
                <div className="alert alert-danger">{error}</div>
                <Button variant="primary" onClick={() => navigate('/allproducts')}>Back to Products</Button>
            </Container>
            <Footer />
        </>
    );

    if (!product) return null;

    return (
        <>
            <AppNavbar />
            <Container className="py-5">
                <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
                <Row>
                    <Col md={6}>
                        <div className="product-image-container shadow-soft bg-white p-3 rounded-3">
                            <Card.Img
                                src={product.imageUrl || 'https://placehold.co/600x800?text=No+Image'}
                                alt={product.name}
                                className="img-fluid rounded"
                                style={{ maxHeight: '600px', objectFit: 'contain' }}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="ps-md-4">
                            <Badge bg="light" className="mb-2 text-muted border">{product.category}</Badge>
                            <h1 className="fw-bold mb-3" style={{ color: 'var(--text-main)' }}>{product.name}</h1>
                            <h2 className="fw-bold mb-4" style={{ color: 'var(--primary)' }}>₹{product.price}</h2>

                            <hr />

                            <div className="my-4">
                                <h5 className="fw-bold">Description</h5>
                                <p className="text-muted lead" style={{ fontSize: '1rem' }}>
                                    {product.description || 'No description available for this product.'}
                                </p>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <label className="me-3 fw-bold">Quantity:</label>
                                <div className="d-flex align-items-center border border-secondary-subtle rounded" style={{ height: '40px' }}>
                                    <Button
                                        variant="link"
                                        className="text-decoration-none px-3 text-secondary fw-bold"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        style={{ borderRight: '1px solid var(--border-color)', height: '100%', borderRadius: '0' }}
                                    >
                                        -
                                    </Button>
                                    <div className="px-3 fw-bold text-center" style={{ minWidth: '40px' }}>
                                        {quantity}
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-decoration-none px-3 text-secondary fw-bold"
                                        onClick={() => setQuantity(quantity + 1)}
                                        style={{ borderLeft: '1px solid var(--border-color)', height: '100%', borderRadius: '0' }}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="d-grid gap-3">
                                <Button
                                    className={added ? "btn-success" : "btn-primary"}
                                    size="lg"
                                    onClick={handleAddToCart}
                                    disabled={added}
                                    style={added ? { background: 'var(--success)', border: 'none' } : {}}
                                >
                                    {added ? "Added to Cart!" : "Add to Cart"}
                                </Button>
                                <Button variant="outline-primary" size="lg" className="fw-bold">
                                    Wishlist
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ProductDetails;
