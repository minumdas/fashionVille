import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../utils/api';

const Homecard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        // Show only first 8 products for "New Arrivals"
        setProducts(data.slice(0, 8));
        setLoading(false);
      } catch (err) {
        console.error('[Homecard] Error:', err);
        setError('Failed to load arrivals');
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="text-center p-4">Loading arrivals...</div>;
  if (error) return <div className="alert alert-light text-center">{error}</div>;

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
          <div className="card h-100 border-0 shadow-soft">
            <div className="position-relative overflow-hidden">
              <img
                src={product.imageUrl || "https://via.placeholder.com/300x200?text=Product"}
                className="card-img-top"
                alt={product.name}
                style={{ height: '320px', objectFit: 'cover', transition: 'var(--transition-base)' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=Product";
                }}
              />
            </div>

            <div className="card-body">
              <h6 className="mb-1 fw-bold text-truncate">{product.name}</h6>
              <p className="small text-muted mb-2 text-truncate">
                {product.description || 'Trendy & comfortable styles'}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold" style={{ color: 'var(--text-main)' }}>₹{product.price}</span>
                <button className="btn btn-sm btn-outline-primary px-3">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homecard;