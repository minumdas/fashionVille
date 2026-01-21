import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchCategoriesByType } from '../utils/api';
import './Shopbycategory.css';

const Shopbycategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('[ShopByCategory] Fetching categories...');
        const data = await fetchCategoriesByType('MAIN');
        console.log('[ShopByCategory] Received categories:', data);
        setCategories(data || []);
        setLoading(false);
      } catch (err) {
        console.error('[ShopByCategory] Error loading categories:', err);
        setError('Failed to load categories');
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="container my-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="container my-4">
        <div className="alert alert-info" role="alert">
          No categories available at the moment.
        </div>
      </div>
    );
  }

  // chunk cards per slide
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    slides.push(categories.slice(i, i + chunkSize));
  }

  return (
    <div className="container my-4">
      <Carousel
        indicators={false}
        controls={true}
        interval={3000}
        pause="hover"
      >
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="category-grid">
              {group.map((cat, index) => (
                <div className="category-cell" key={cat.id || index}>
                  <div className="card category-card">
                    <img
                      src={cat.imageUrl}
                      className="card-img-top"
                      alt={cat.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x400?text=Category";
                      }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{cat.title}</h5>
                      <p className="card-text">{cat.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Shopbycategory;
