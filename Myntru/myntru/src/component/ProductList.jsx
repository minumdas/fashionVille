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
      <h3 className="section-title">{category} Collection</h3>
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
                <p className="small text-muted mb-3 text-truncate">
                  Quality & Comfort
                </p>
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
      </Row>
      {products.length === 0 && <div className="text-center py-4 border rounded bg-light"><p className="text-muted mb-0">No products available in this category.</p></div>}
    </div>
  );
};

export default ProductList;
