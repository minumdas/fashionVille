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
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                src={product.imageUrl || 'https://placehold.co/600x800?text=No+Image'}
                                alt={product.name}
                                className="img-fluid rounded"
                            />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <div className="ps-md-4">
                            <Badge bg="secondary" className="mb-2">{product.category}</Badge>
                            <h1 className="fw-bold mb-3">{product.name}</h1>
                            <h2 className="text-primary fw-bold mb-4">₹{product.price}</h2>

                            <hr />

                            <div className="my-4">
                                <h5 className="fw-bold">Description</h5>
                                <p className="text-muted lead" style={{ fontSize: '1rem' }}>
                                    {product.description || 'No description available for this product.'}
                                </p>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <label className="me-3 fw-bold">Quantity:</label>
                                <div className="input-group" style={{ width: '130px' }}>
                                    <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                                    <input type="text" className="form-control text-center" value={quantity} readOnly />
                                    <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <Button
                                    variant={added ? "success" : "primary"}
                                    size="lg"
                                    onClick={handleAddToCart}
                                    disabled={added}
                                >
                                    {added ? "Added to Cart!" : "Add to Cart"}
                                </Button>
                                <Button variant="outline-dark" size="lg">Buy Now</Button>
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
