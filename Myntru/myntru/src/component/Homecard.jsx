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
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <img
              src={product.imageUrl || "https://via.placeholder.com/300x200?text=Product"}
              className="card-img-top rounded-top-4"
              alt={product.name}
              style={{ height: '250px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200?text=Product";
              }}
            />

            <div className="card-body text-center">
              <h5 className="card-title fw-bold">
                {product.name}
              </h5>

              <p className="card-text text-muted">
                {product.description || 'Trendy & comfortable styles'}
              </p>

              <p className="fw-bold text-danger">₹{product.price}</p>

              <button className="btn btn-danger fw-bold">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homecard;