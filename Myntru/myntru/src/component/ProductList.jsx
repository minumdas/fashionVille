import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProductsByCategory } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductsByCategory(category);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(`[ProductList] Error fetching products for ${category}:`, err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    const result = await addToCart(productId, 1);
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(`Failed to add: ${result.error || 'Check connection'}`);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div><p className="mt-2">Loading products...</p></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="product-list-section">
      <h3 className="fw-bold mb-4 text-center">{category} Collection</h3>
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x400?text=No+Image";
                }}
              />
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="fs-6 fw-bold">{product.name}</Card.Title>
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
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {products.length === 0 && <div className="text-center py-4 border rounded bg-light"><p className="text-muted mb-0">No products available in this category.</p></div>}
    </div>
  );
};

export default ProductList;
